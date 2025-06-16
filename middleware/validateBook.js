const { body } = require('express-validator');
const { bookValidationRules } = require('../middleware/validateBook');
const { validationResult } = require('express-validator');

exports.bookValidationRules = [
  body('book').custom(value => {
    let book;
    try {
      book = JSON.parse(value);
    } catch (err) {
      throw new Error('Le champ book doit être un JSON valide');
    }

    if (!book.title || book.title.trim() === '') {
      throw new Error('Le titre est obligatoire');
    }

    if (!book.author || book.author.trim() === '') {
      throw new Error('L’auteur est obligatoire');
    }

    // Tu peux ajouter d’autres validations ici si besoin

    return true;
  })
];
