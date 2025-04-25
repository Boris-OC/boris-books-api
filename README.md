# 📚 Boris Books API

Une API sécurisée de gestion de livres avec authentification utilisateur, développée avec Node.js, Express et MongoDB.

---

## 🚀 Fonctionnalités

- Création de compte utilisateur sécurisé avec **bcrypt** et **JWT**
- Authentification via token
- CRUD complet pour les livres (Create, Read, Update, Delete)
- Notation des livres par les utilisateurs
- Upload d’image de couverture avec **Multer**
- Sécurisation de l’API avec **Helmet**, **express-rate-limit** et **mongo-sanitize**

---

## 🛠️ Installation

### Prérequis

- Node.js
- MongoDB Atlas (ou local)

### Cloner le projet

```bash
git clone https://github.com/Boris-OC/boris-books-api.git
cd boris-books-api
npm install
```

---

## 🔐 Variables d’environnement

Créer un fichier `.env` à la racine :

```env
PORT=3000
MONGODB_URI=your_mongodb_uri_here
JWT_SECRET=your_secret_key
```

Ou utiliser le modèle fourni :

```bash
cp .env.example .env
```

---

## ▶️ Lancer l’API

```bash
npm start
```

---

## 📬 Endpoints principaux

| Méthode | URL                     | Description                  |
|---------|--------------------------|------------------------------|
| POST    | `/api/auth/signup`       | Créer un compte              |
| POST    | `/api/auth/login`        | Se connecter                 |
| GET     | `/api/books`             | Obtenir tous les livres      |
| GET     | `/api/books/:id`         | Obtenir un livre spécifique  |
| POST    | `/api/books`             | Ajouter un livre             |
| PUT     | `/api/books/:id`         | Modifier un livre            |
| DELETE  | `/api/books/:id`         | Supprimer un livre           |
| POST    | `/api/books/:id/rating`  | Noter un livre               |

---

## 🧪 Collection Postman

Une collection Postman est incluse dans le projet : `postman_collection.json`

---

## ✅ Bonnes pratiques respectées

- Architecture MVC
- Sécurité des données
- Middleware d’erreur
- Variables d’environnement sécurisées

---

## 📦 Dépendances principales

- express
- mongoose
- bcrypt
- jsonwebtoken
- multer
- helmet
- dotenv
- express-rate-limit
- mongoose-unique-validator
- mongo-sanitize

---
## Collection Postman

Le fichier `postman/boris-books-api.postman_collection.json` contient tous les endpoints de l'API.  
Importez-le dans Postman pour commencer à tester !

## 🧠 Projet réalisé dans le cadre de la formation Développeur Web chez OpenClassrooms.

