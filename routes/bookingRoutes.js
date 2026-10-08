const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/bookingController');
const cekApiKey = require('../middlewares/cekApiKey');

// GET
router.get('/', bookingController.getAll);
router.get('/:id', bookingController.getById);

// POST
router.post('/', cekApiKey, bookingController.create);

// PUT
router.put('/:id', cekApiKey, bookingController.update);

// DELETE
router.delete('/:id', cekApiKey, bookingController.remove);

module.exports = router;