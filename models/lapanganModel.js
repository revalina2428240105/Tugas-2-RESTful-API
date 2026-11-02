
const mongoose = require('mongoose');

const lapanganSchema = new mongoose.Schema({
  namaLapangan: {
    type: String,
    required: [true, 'nama lapangan wajib diisi'],
    trim: true
  },
  jenisLapangan: {
    type: String,
    required: [true, 'jenis lapangan wajib diisi'],
    trim: true
  },
  hargaPerJam: {
    type: Number,
    required: [true, 'harga per jam wajib diisi']
  }
});

module.exports = mongoose.model('Lapangan', lapanganSchema);
