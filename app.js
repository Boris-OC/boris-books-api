// app.js — Configuration principale de l'application

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/book');

const app = express();

// Connexion à MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connexion à MongoDB réussie !'))
  .catch((err) => console.error('❌ Échec de connexion MongoDB :', err));

// Middlewares globaux
app.use(express.json()); // Body parser
app.use(helmet()); // Sécurité en-têtes HTTP
app.use(mongoSanitize()); // Protection injection NoSQL
app.use('/images', express.static(path.join(__dirname, 'images'))); // Accès dossier images

// Limiteur de requêtes (100 req / 15 min)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// Exportation de l'app
module.exports = app;