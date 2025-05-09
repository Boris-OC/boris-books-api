const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController');

// Route d'inscription
router.post('/signup', authCtrl.signup);

// Route de connexion
router.post('/login', authCtrl.login);

module.exports = router;