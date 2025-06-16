const Book = require('../models/book');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Fonction pro pour essayer de supprimer un fichier avec retries (problème EPERM sur Windows)
const tryUnlink = (path, retries = 5) => {
  fs.unlink(path, (err) => {
    if (err) {
      if (err.code === 'EPERM' && retries > 0) {
        console.warn(`Retrying unlink for ${path} (${retries} retries left)`);
        setTimeout(() => tryUnlink(path, retries - 1), 100); // retry after 100ms
      } else {
        console.error('Erreur suppression image originale:', err);
      }
    } else {
      console.log('Image originale supprimée');
    }
  });
};

// Créer un livre avec optimisation d'image
exports.createBook = async (req, res) => {
  try {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject.userId; // 

    const inputPath = req.file.path;
    const outputPath = inputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

    await sharp(inputPath)
      .resize(500)
      .webp({ quality: 80 })
      .toFile(outputPath)
      .then(() => {
        tryUnlink(inputPath);
      });

const initialRating = bookObject.rating || 0;
const book = new Book({
  ...bookObject,
  userId: req.auth.userId,
  imageUrl: `${req.protocol}://${req.get('host')}/images/${path.basename(outputPath)}`,
  ratings: initialRating > 0 ? [{ userId: req.auth.userId, grade: initialRating }] : [],
  averageRating: initialRating
});

    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Récupérer tous les livres
exports.getAllBooks = (req, res) => {
  Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
};

// Récupérer un livre par ID
exports.getOneBook = (req, res) => {
  Book.findOne({ _id: req.params.id })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ error }));
};

// Modifier un livre (sans optimisation d'image pour l'instant)
exports.modifyBook = (req, res) => {
  const bookObject = req.file
    ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      }
    : { ...req.body };

  Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Livre modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

// Supprimer un livre
exports.deleteBook = (req, res) => {
  Book.findOne({ _id: req.params.id })
    .then(book => {
      const filename = book.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, (err) => {
        if (err) {
          console.error('Erreur suppression image originale:', err);
          // On continue quand même pour supprimer le livre
        }

        Book.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Livre supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

// Noter un livre
exports.rateBook = (req, res) => {
  const userId = req.auth.userId;
  const grade = req.body.rating;

  Book.findById(req.params.id)
    .then(book => {
      const existingRating = book.ratings.find(r => r.userId === userId);
      if (existingRating) {
        return res.status(400).json({ message: 'Vous avez déjà noté ce livre.' });
      }
      book.ratings.push({ userId, grade });

      const total = book.ratings.reduce((acc, cur) => acc + cur.grade, 0);
      book.averageRating = total / book.ratings.length;

      return book.save().then(() => res.status(200).json(book));
    })
    .catch(error => res.status(400).json({ error }));
};

// Récupérer les 3 livres les mieux notés
exports.getBestRatedBooks = (req, res) => {
  Book.find()
    .sort({ averageRating: -1 })
    .limit(3)
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
};
