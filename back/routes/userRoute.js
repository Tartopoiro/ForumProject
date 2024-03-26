const {requeteOut, requeteIn} = require("../mysqlConnection");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {convertUnicode} = require("../convertUnicode");

//Renvoie un utilisateur avec son mail (URL)
app.get('/api/user', async (req, res) => {
    let mail;

    try {
        mail = req.query.mail;
    } catch (e) {
        res.status(500).send({message: "formatage de la requete incorrect"});
    }

    try{
        const query = 'call getUserFromMail(\''+convertUnicode(mail)+'\')';
        const result = await requeteOut(query);
        res.json(result);
    } catch (e) {
        res.status(404).send({message : "user non trouvé"});
        console.error('erreur lors de la recherche de user ', e);
    }
});
//Renvoie tous les utilisateurs
app.get('/api/users', async (req, res) => {
    try{
        const query = 'call getUsers()';
        const result = await requeteOut(query);
        res.json(result);
    } catch (e) {
        res.status(404).send({message : "requete echoué"});
        console.error('erreur lors de la recherche des users ', e);
    }
});

//Créer un utilisateur avec les données issue du JSON
app.post('/api/user',bodyParser.json(), async (req, res) => {
    let mail;
    let nom;
    let prenom;
    let numero;
    try {
        mail = req.body['Email'];
        nom = req.body['Nom'];
        prenom = req.body['Prenom'];
        numero = req.body['Numero'];
    } catch (e) {
        res.status(500).send({message: "formatage de la requete incorrect"});
    }

    try{
        const query = 'CALL create_user(\''+convertUnicode(nom)+'\',\''+convertUnicode(prenom)+
            '\',\''+convertUnicode(mail)+'\','+convertUnicode(numero)+')';
        await requeteIn(query);
        res.status(200).send({message : "User created"});
    }catch (e) {
        res.status(500).send({message : "query failed"});
        console.error('erreur lors de la creation de user ', e);
    }
});
//Modifie un utilisateur avec les données issue du JSON
app.patch('/api/user',bodyParser.json(), async (req, res) => {
    let mail;
    let nom;
    let prenom;
    let numero;

    try {
        mail = req.body['Email'];
        nom = req.body['Nom'];
        prenom = req.body['Prenom'];
        numero = req.body['Numero'];
    } catch (e) {
        res.status(500).send({message: "formatage de la requete incorrect"});
    }

    try{
        const query = 'CALL update_user(\''+convertUnicode(nom)+'\',\''+convertUnicode(prenom)+
            '\',\''+convertUnicode(mail)+'\','+convertUnicode(numero)+')';
        await requeteIn(query);
        res.status(200).send({message : "User created"});
    }catch (e) {
        res.status(500).send({message : "query failed"});
        console.error('erreur lors de la creation de user ', e);
    }

});

module.exports = app;