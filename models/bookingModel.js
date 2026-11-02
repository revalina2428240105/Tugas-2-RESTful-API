
const mongoose = require('mongoose');

// Schema kecil untuk detail lapangan (Embedding)
const lapanganSchema = new mongoose.Schema({
  namaLapangan: String,
  jenisLapangan: String,
  hargaPerJam: Number,
}, { _id: false });

// Schema utama booking
const bookingSchema = new mongoose.Schema({
  namaPemesan: {
    type: String,
    required: [true, 'nama pemesan wajib diisi'],
    trim: true
  },
  tanggal: {
    type: String,
    required: [true, 'tanggal wajib diisi']
  },
  jamMulai: {
    type: String,
    required: [true, 'jam mulai wajib diisi']
  },
  durasiJam: {
    type: Number,
    required: [true, 'durasi jam wajib diisi'],
    min: [1, 'durasi minimal 1 jam']
  },

  // Embedding: menyimpan detail lapangan langsung di booking
  lapangan: lapanganSchema,

  // Referencing: menyimpan ID dari koleksi Lapangan
  lapanganId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lapangan'
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Booking', bookingSchema);
