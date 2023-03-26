const express = require('express');
const router = express.Router();

const jimpCtrl = require('../controllers/jimp');

router.get('/hash', jimpCtrl.hash);
router.get('/hashRecadrage125', jimpCtrl.hashRecadrage125);
router.get('/hashRecadrage1Virgule5', jimpCtrl.hashRecadrage1Virgule25);
router.get('/pixel', jimpCtrl.pixel);
router.get('/pixelRecadrage1Virgule5', jimpCtrl.pixelRecadrage1Virgule25);

module.exports = router;