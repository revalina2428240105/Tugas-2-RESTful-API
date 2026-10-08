const bookingModel = require('../models/bookingModel');

// GET semua booking
exports.getAll = (req, res) => {
    const { lapangan } = req.query;

    if (lapangan) {
        return res.json(bookingModel.filterByLapangan(lapangan));
    }

    res.json(bookingModel.getAll());
};

// GET booking berdasarkan ID
exports.getById = (req, res, next) => {
    const id = parseInt(req.params.id);
    const data = bookingModel.getById(id);

    if (!data) {
        const error = new Error('Data booking tidak ditemukan');
        error.status = 404;
        return next(error);
    }

    res.json(data);
};

// POST tambah booking
exports.create = (req, res, next) => {
    const {
        namaPemesan,
        lapangan,
        tanggal,
        jamMulai,
        durasiJam
    } = req.body;

    // Validasi data
    if (
        !namaPemesan ||
        !lapangan ||
        !tanggal ||
        !jamMulai ||
        durasiJam === undefined
    ) {
        const error = new Error('Data booking tidak lengkap');
        error.status = 400;
        return next(error);
    }

    if (typeof durasiJam !== 'number') {
        const error = new Error('durasiJam harus berupa angka');
        error.status = 400;
        return next(error);
    }

    const data = bookingModel.create({
        namaPemesan,
        lapangan,
        tanggal,
        jamMulai,
        durasiJam
    });

    res.status(201).json({
        status: 'success',
        message: 'Booking berhasil ditambahkan',
        data
    });
};

// PUT ubah booking
exports.update = (req, res, next) => {
    const id = parseInt(req.params.id);

    const {
        namaPemesan,
        lapangan,
        tanggal,
        jamMulai,
        durasiJam
    } = req.body;

    // Validasi data
    if (
        !namaPemesan ||
        !lapangan ||
        !tanggal ||
        !jamMulai ||
        durasiJam === undefined
    ) {
        const error = new Error('Data booking tidak lengkap');
        error.status = 400;
        return next(error);
    }

    if (typeof durasiJam !== 'number') {
        const error = new Error('durasiJam harus berupa angka');
        error.status = 400;
        return next(error);
    }

    const data = bookingModel.update(id, {
        namaPemesan,
        lapangan,
        tanggal,
        jamMulai,
        durasiJam
    });

    if (!data) {
        const error = new Error('Data booking tidak ditemukan');
        error.status = 404;
        return next(error);
    }

    res.json({
        status: 'success',
        message: 'Booking berhasil diperbarui',
        data
    });
};

// DELETE hapus booking
exports.remove = (req, res, next) => {
    const id = parseInt(req.params.id);

    const deleted = bookingModel.remove(id);

    if (!deleted) {
        const error = new Error('Data booking tidak ditemukan');
        error.status = 404;
        return next(error);
    }

    res.status(204).send();
};