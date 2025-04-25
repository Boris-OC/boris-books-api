# Stopper le script s’il y a une erreur
$ErrorActionPreference = "Stop"

Write-Host "Suppression de l'ancien depot Git..."
Remove-Item -Recurse -Force .git -ErrorAction SilentlyContinue

Write-Host "Initialisation du depot Git"
git init
git branch -M main
git remote add origin https://github.com/Boris-OC/boris-books-api.git

# Creation .gitignore si besoin
if (!(Test-Path ".gitignore")) {
@"
node_modules/
.env
.env.local
.DS_Store
*.log
npm-debug.log*
"@ | Out-File -Encoding utf8 .gitignore
}

# 1. .gitignore
git add .gitignore
git commit -m "Ajoute .gitignore pour ignorer les fichiers sensibles"

# 2. package.json
if (Test-Path "package.json") {
    git add package.json
    git commit -m "Ajoute package.json avec les dependances necessaires"
}

# 3. package-lock.json
if (Test-Path "package-lock.json") {
    git add package-lock.json
    git commit -m "Ajoute package-lock.json pour figer les versions"
}

# 4. server.js ou app.js
if (Test-Path "server.js") {
    git add server.js
    git commit -m "Ajoute point d'entree de l'API dans server.js"
} elseif (Test-Path "app.js") {
    git add app.js
    git commit -m "Ajoute point d'entree de l'API dans app.js"
}

# 5. routes
if (Test-Path "routes/auth.js") {
    git add routes/auth.js
    git commit -m "Ajoute les routes d'authentification"
}
if (Test-Path "routes/book.js") {
    git add routes/book.js
    git commit -m "Ajoute les routes de gestion des livres"
}

# 6. models
if (Test-Path "models/User.js") {
    git add models/User.js
    git commit -m "Ajoute le modele User avec email et mot de passe hache"
}
if (Test-Path "models/Book.js") {
    git add models/Book.js
    git commit -m "Ajoute le modele Book avec notes et moyenne"
}

# 7. middleware
if (Test-Path "middleware/auth.js") {
    git add middleware/auth.js
    git commit -m "Ajoute le middleware d'authentification JWT"
}

# 8. .env.example
if (Test-Path ".env.example") {
    git add .env.example
    git commit -m "Ajoute le fichier .env.example"
}

# 9. README
if (Test-Path "README.md") {
    git add README.md
    git commit -m "Ajoute le fichier README.md"
}

# 10. Collection Postman
if (Test-Path "postman/boris-books-api.postman_collection.json") {
    git add postman/boris-books-api.postman_collection.json
    git commit -m "Ajoute la collection Postman"
}

Write-Host "Push vers GitHub"
git push -u origin main

Write-Host "Projet proprement reinstalle avec 10 commits sur GitHub"
