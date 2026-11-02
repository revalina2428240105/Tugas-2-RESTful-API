
const express = require('express');
const router = express.Router();
const c = require('../controllers/bookingController');
const cekApiKey = require('../middlewares/cekApiKey');

// GET semua booking
router.get('/', c.getAll);

// GET booking berdasarkan ID
router.get('/:id', c.getById);

// POST tambah booking (memerlukan API Key)
router.post('/', cekApiKey, c.create);

// PUT update booking
//router.put('/:id', cekApiKey, c.update);

module.exports = router;
