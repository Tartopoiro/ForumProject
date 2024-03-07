const {requete} = require("../mysqlConnection");
const express = require('express');
const app = express();



app.get('/api/user', async (req, res) => {
    const mail = req.query.mail;
    const query = 'call getUserFromMail(\''+mail+'\')';
    const result = await requete(query);
    res.json(result);
});

module.exports = app;