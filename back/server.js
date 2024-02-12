const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Port d'écoute par défaut 3000

// Middleware pour le traitement des requêtes JSON
app.use(express.json());

// Définir une route
app.get('/', (req, res) => {
    res.send('Bienvenue sur mon serveur Express !');
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur Express en cours d'exécution sur le port ${PORT}`);
});