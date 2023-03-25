const express = require('express');
const router = express.Router();

const jimpCtrl = require('../controllers/jimp');

router.get('/hashDedblonnage', jimpCtrl.hashDedblonnage);
router.get('/pixelDedblonnage', jimpCtrl.pixelDedblonnage);

module.exports = router;