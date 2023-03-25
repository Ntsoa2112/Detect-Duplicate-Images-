const express = require('express');
const router = express.Router();

const newsletterCtrl = require('../controllers/newsletter');

router.post('/sendMail', newsletterCtrl.sendMail);
router.put('/', newsletterCtrl.update);
router.post('/', newsletterCtrl.creer_newsletter);
router.get('/', newsletterCtrl.list);
router.delete('/', newsletterCtrl.delete);


module.exports = router;