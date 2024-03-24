const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Port d'écoute par défaut 3000
const { connexion, deconnecter} = require("./mysqlConnection");
//Import des routes
const userRoute = require("./routes/userRoute")
const blogRoute = require("./routes/blogRoute")
const accesRoute = require("./routes/accesRoute")
const messageRoute = require("./routes/messageRoute")
app.use('/', userRoute);
app.use('/', blogRoute);
app.use('/', accesRoute);
app.use('/', messageRoute);

// Demarrage du serveur
app.listen(PORT, async () => {

    console.log(`Serveur Express en cours d'exécution sur le port ${PORT}`);
    connexion();
});
// Test de la connexion à la BdD
app.get('/api', (req, res) => {
    res.json({ message: 'test ok' });
});










