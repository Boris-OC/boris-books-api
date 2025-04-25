// server.js — Point d'entrée du serveur HTTP

const http = require('http');
const app = require('./app');
const PORT = process.env.PORT || 3000;

// Création du serveur HTTP
const server = http.createServer(app);

// Démarrage du serveur
server.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
