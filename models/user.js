
const mongoose = require('mongoose');

// Schéma utilisateur : email unique + mot de passe
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});


module.exports = mongoose.model('User', userSchema);