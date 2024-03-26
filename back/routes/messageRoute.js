const {requeteOut, requeteIn} = require("../mysqlConnection");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {convertUnicode} = require("../convertUnicode");
//Renvoie tout les messages d'un blog passé, param : idblog (URL)
app.get('/api/message', async (req, res) => {
    let blog;
    try {
        blog = req.query.idblog;
    } catch (e) {
        res.status(500).send({message: "formatage de la requete incorrect"});
    }

    try{
        const query = 'call getMessagesFromBlog('+convertUnicode(blog)+')';
        const result = await requeteOut(query);
        res.json(result);
    } catch (e) {
        res.status(404).send({message : "user non trouvé"});
        console.error('erreur lors de la recherche de user ', e);
    }
});
//Archive en BdD un message avec un titre, un contenu, un user et un blog (JSON)
app.post('/api/message',bodyParser.json(), async (req, res) => {
    let contenu;
    let titre;
    let blog;
    let user;
    try {
        contenu = req.body['Contenu'];
        titre = req.body['Titre'];
        blog = req.body['IdBlog'];
        user = req.body['IdUser'];
    } catch (e) {
        res.status(500).send({message: "formatage de la requete incorrect"});
    }

    try{
        const query = 'CALL create_message(\''+convertUnicode(contenu)+'\',\''+convertUnicode(titre)+'\','+
            convertUnicode(blog)+','+convertUnicode(user)+')';
        await requeteIn(query);
        res.status(200).send({message : "User created"});
    }catch (e) {
        res.status(500).send({message : "query failed"});
        console.error('erreur lors de la creation de user ', e);
    }
});


module.exports = app;