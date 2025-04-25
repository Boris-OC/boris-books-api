
// Vérifie la présence et la validité du token JWT dans les headers

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Récupère le token depuis l'en-tête Authorization
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Ajoute l'identifiant utilisateur à la requête
    req.auth = { userId: decodedToken.userId };
    next(); // Poursuit vers la route suivante
  } catch (error) {
    res.status(401).json({ error: 'Requête non authentifiée' });
  }
};