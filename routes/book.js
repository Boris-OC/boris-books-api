const express = require('express');
const router = express.Router();
const bookCtrl = require('../controllers/bookController');
const auth = require('../middleware/auth');
const sharp = require('../middleware/sharp');
const multer = require('../middleware/multer-config');
const { bookValidationRules, validateRequest } = require('../middleware/validateBook');
const { validationResult } = require('express-validator');

// Créer un livre avec validation
router.post(
  '/',
  auth,
  multer,
  sharp,
  bookValidationRules,
  validateRequest,
  bookCtrl.createBook
);

// Récupérer les 3 livres les mieux notés
router.get('/bestrating', bookCtrl.getBestRatedBooks);

// Récupérer tous les livres
router.get('/', bookCtrl.getAllBooks);

// Récupérer un livre par ID
router.get('/:id', bookCtrl.getOneBook);

// Modifier un livre
router.put('/:id', auth, multer, sharp, bookCtrl.modifyBook);

// Supprimer un livre
router.delete('/:id', auth, bookCtrl.deleteBook);

// Noter un livre
router.post('/:id/rating', auth, bookCtrl.rateBook);

module.exports = router;
