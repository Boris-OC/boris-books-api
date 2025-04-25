# Présentation orale – Projet : Boris Books API

## 1. Objectif du projet

Le but de ce projet est de créer une API RESTful permettant de gérer une collection de livres.  
Elle permet à des utilisateurs de s'enregistrer, de se connecter et de manipuler des données de livres via des endpoints sécurisés.

---

## 2. Fonctionnalités principales

- **Authentification :**
  - Inscription d’un utilisateur
  - Connexion avec retour d’un token JWT

- **Livres :**
  - Liste de tous les livres
  - Ajout d’un nouveau livre
  - Consultation d’un livre par ID
  - Mise à jour d’un livre
  - Suppression d’un livre

---

## 3. Technologies utilisées

- **Backend :** Node.js avec Express
- **Base de données :** MongoDB Atlas (via Mongoose)
- **Authentification :** JWT (JSON Web Token)
- **Tests des routes :** Postman

---

## 4. Structure du projet

```
boris-books-api/
├── server.js               # Point d’entrée de l’application
├── routes/
│   ├── auth.js             # Routes d'inscription / connexion
│   └── book.js             # Routes de gestion des livres
├── models/                 # (à créer pour les schémas Mongoose)
├── .env.example            # Variables d’environnement
├── postman/                # Collection Postman pour tester l’API
└── README.md               # Guide d’installation et d’utilisation
```

---

## 5. Utilisation

```bash
# Installation des dépendances
npm install

# Démarrage du serveur
npm start
```

---

## 6. Sécurité

- Les routes de livres sont protégées par un middleware d'authentification
- Le token JWT est envoyé dans le header `Authorization`

---

## 7. Pour aller plus loin (améliorations possibles)

- Ajout de rôles (admin/utilisateur)
- Pagination des livres
- Téléversement d’images de couverture (avec Multer)
- Documentation Swagger de l'API

---

## 8. Démo

- Lancement de l’API sur `http://localhost:3000`
- Import de la collection Postman disponible dans `postman/boris-books-api.postman_collection.json`

---

## 9. Conclusion

Ce projet m’a permis de consolider mes compétences en Express, MongoDB, sécurité web (auth/JWT) et gestion de projets backend.
