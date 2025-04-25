const express = require('express');
const router = express.Router();
const bookCtrl = require('../controllers/bookController');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Créer un livre
router.post('/', auth, multer, bookCtrl.createBook);

// Récupérer tous les livres
router.get('/', bookCtrl.getAllBooks);

// Récupérer un livre par ID
router.get('/:id', bookCtrl.getOneBook);

// Modifier un livre
router.put('/:id', auth, multer, bookCtrl.modifyBook);

// Supprimer un livre
router.delete('/:id', auth, bookCtrl.deleteBook);

// Noter un livre
router.post('/:id/rating', auth, bookCtrl.rateBook);

module.exports = router;