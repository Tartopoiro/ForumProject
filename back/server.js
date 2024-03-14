const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Port d'écoute par défaut 3000
const {requete, connexion, deconnecter} = require("./mysqlConnection");
const userRoute = require("./routes/userRoute")

app.use('/', userRoute);

// Démarrer le serveur
app.listen(PORT, async () => {

    console.log(`Serveur Express en cours d'exécution sur le port ${PORT}`);
    connexion();
});

app.get('/api', (req, res) => {
    res.json({ message: 'test ok' });

});










