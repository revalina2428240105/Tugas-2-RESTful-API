
const Lapangan = require('../models/lapanganModel');

// Menambahkan data lapangan
exports.create = async (req, res) => {
  try {
    const lapangan = await Lapangan.create(req.body);
    res.status(201).json(lapangan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Menampilkan semua data lapangan
exports.getAll = async (req, res) => {
  try {
    const data = await Lapangan.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
