const {requeteOut, requeteIn} = require("../mysqlConnection");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.get('/api/user', async (req, res) => {
    const mail = req.query.mail;
    try{
        const query = 'call getUserFromMail(\''+mail+'\')';
        const result = await requeteOut(query);
        res.json(result);
    } catch (e) {
        res.status(404).send({message : "user non trouvé"});
        console.error('erreur lors de la recherche de user ', e);
    }

});

app.post('/api/user',bodyParser.json(), async (req, res) => {
    const mail = req.body['Email'];
    const nom = req.body['Nom'];
    const prenom = req.body['Prenom'];
    const numero = req.body['Numero'];

    try{
        const query = 'CALL create_user(\''+nom+'\',\''+prenom+'\',\''+mail+'\','+numero+')';
        await requeteIn(query);
        res.status(200).send({message : "User created"});
    }catch (e) {
        res.status(500).send({message : "query failed"});
        console.error('erreur lors de la creation de user ', e);
    }
});

app.patch('/api/user',bodyParser.json(), async (req, res) => {
    const mail = req.body['Email'];
    const nom = req.body['Nom'];
    const prenom = req.body['Prenom'];
    const numero = req.body['Numero'];

    try{
        const query = 'CALL update_user(\''+nom+'\',\''+prenom+'\',\''+mail+'\','+numero+')';
        await requeteIn(query);
        res.status(200).send({message : "User created"});
    }catch (e) {
        res.status(500).send({message : "query failed"});
        console.error('erreur lors de la creation de user ', e);
    }

});

module.exports = app;