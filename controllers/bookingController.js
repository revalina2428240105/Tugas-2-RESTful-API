
const FieldBooking = require('../models/bookingModel');
const { errorHttp } = require('../middlewares/errorHandler');

// POST tambah booking
exports.create = async (req, res) => {
  try {
    const booking = await FieldBooking.create(req.body);
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET semua booking

// GET semua booking + Filtering + Sorting + Pagination
// GET semua booking + Filtering + Sorting + Pagination + Projection
exports.getAll = async (req, res) => {
  try {
    // 1. FILTERING
    const filter = {};

    if (req.query.lapangan) {
      filter['lapangan.namaLapangan'] = String(req.query.lapangan);
    }

    if (req.query.tanggal) {
      filter.tanggal = String(req.query.tanggal);
    }

    // 2. PAGINATION
    function angkaAman(nilai, bawaan, min, maks) {
      const n = parseInt(nilai, 10);

      if (Number.isNaN(n)) return bawaan;

      return Math.min(Math.max(n, min), maks);
    }

    const page = angkaAman(req.query.page, 1, 1, 1000000);
    const limit = angkaAman(req.query.limit, 10, 1, 50);
    const skip = (page - 1) * limit;

    // 3. SORTING
    const daftarSort = [
      'namaPemesan',
      'tanggal',
      'jamMulai',
      'durasiJam',
      'createdAt'
    ];

    const sortQuery = req.query.sort || 'namaPemesan';
    const arah = sortQuery.startsWith('-') ? -1 : 1;
    const fieldSort = sortQuery.startsWith('-')
      ? sortQuery.substring(1)
      : sortQuery;

    if (!daftarSort.includes(fieldSort)) {
      return res.status(400).json({
        message: 'Field sorting tidak diizinkan'
      });
    }

    const sortOptions = {
      [fieldSort]: arah,
      _id: 1
    };

    // 4. PROJECTION
    const FIELD_BOLEH_DIPILIH = [
      'namaPemesan',
      'tanggal',
      'jamMulai',
      'durasiJam',
      'lapangan',
      'lapanganId',
      'createdAt',
      '_id'
    ];

    let selectFields = '';

    if (req.query.fields !== undefined) {
      const fields = String(req.query.fields)
        .split(',')
        .map((f) => f.trim());

      if (
        fields.length === 0 ||
        fields.some((f) => !f) ||
        !fields.every((f) => FIELD_BOLEH_DIPILIH.includes(f))
      ) {
        return res.status(400).json({
          message: `fields hanya boleh: ${FIELD_BOLEH_DIPILIH.join(', ')}`
        });
      }

      selectFields = fields.join(' ');
    }

    // 5. MENYUSUN QUERY
    let query = FieldBooking.find(filter);

    if (selectFields) {
      query = query.select(selectFields);
    }

    // Populate hanya jika lapanganId diminta atau fields tidak ditentukan
    if (!selectFields || selectFields.split(' ').includes('lapanganId')) {
      query = query.populate(
        'lapanganId',
        'namaLapangan jenisLapangan hargaPerJam'
      );
    }

    query = query
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    // 6. AMBIL DATA DAN HITUNG TOTAL
    const [data, total] = await Promise.all([
      query,
      FieldBooking.countDocuments(filter)
    ]);

    // 7. RESPONSE
    res.json({
      data,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};
// GET booking berdasarkan ID
exports.getById = async (req, res) => {
  const data = await FieldBooking.findById(req.params.id)
    .populate('lapanganId');

  if (!data) {
    throw errorHttp(404, 'Data booking tidak ditemukan');
  }

  res.json(data);
};

// PUT mengubah data booking
exports.update = async (req, res) => {
  try {
    const { namaPemesan, ...dataUpdate } = req.body;

    if (!namaPemesan) {
      return res.status(400).json({
        message: 'namaPemesan wajib diisi untuk menentukan data booking'
      });
    }

    const booking = await FieldBooking.findOneAndUpdate(
      { namaPemesan },
      dataUpdate,
      { new: true, runValidators: true }
    ).populate('lapanganId');

    if (!booking) {
      return res.status(404).json({
        message: 'Data booking tidak ditemukan'
      });
    }

    res.json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
