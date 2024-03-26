const {requeteOut, requeteIn} = require("../mysqlConnection");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {convertUnicode} = require("../convertUnicode");

//Renvoie un blog selon l'id en parametre seulement si l'utilisateur y a accès
app.post('/api/getBlog', bodyParser.json(), async (req, res) => {
    let user;
    let blog;

    try {
        user = req.body['IdUser'];
        blog = req.body['IdBlog'];
    } catch (e) {
        res.status(500).send({message: "formatage de la requete incorrect"});
    }

    try{
        const query = 'call getBlogIfAccessibleFromUser('+convertUnicode(user)+','+convertUnicode(blog)+')';
        const result = await requeteOut(query);
        res.json(result);
    } catch (e) {
        res.status(404).send({message : "blog non trouvé"});
        console.error('erreur lors de la recherche de blog ', e);
    }
});
//Créer un blog avec les informations contenues dans le JSON
app.post('/api/blog', bodyParser.json(), async (req,res)=>{
    let public_v ;
    let titre;
    let user;
    let descriptif;

    try {
        public_v = req.body['Public'];
        titre = req.body['Titre'];
        user = req.body['IdUser'];
        descriptif = req.body['Descriptif'];
    } catch (e) {
        res.status(500).send({message: "formatage de la requete incorrect"});
    }

    try{
        const query = 'CALL create_blog('+convertUnicode(public_v)+',\''+convertUnicode(titre)+'\',\''+
            convertUnicode(descriptif)+'\','+convertUnicode(user)+')';
        await requeteIn(query);
        res.status(200).send({message : "Blog created"});
    }catch (e) {
        res.status(500).send({message : "query failed"});
        console.error('erreur lors de la creation du blog ', e);
    }
});
//Mets à jour un blog avec les informations transmis dans le JSON
app.patch('/api/blog', bodyParser.json(), async (req,res)=>{
    let public_v;
    let titre;
    let blog;
    let descriptif;

    try {
        public_v = req.body['Public'];
        titre = req.body['Titre'];
        blog = req.body['IdBlog'];
        descriptif = req.body['Descriptif'];
    } catch (e) {
        res.status(500).send({message: "formatage de la requete incorrect"});
    }

    try{
        const query = 'CALL update_blog('+convertUnicode(blog)+','+convertUnicode(public_v)+
            ',\''+convertUnicode(titre)+'\',\''+convertUnicode(descriptif)+'\')';
        await requeteIn(query);
        res.status(200).send({message : "Blog created"});
    }catch (e) {
        res.status(500).send({message : "query failed"});
        console.error('erreur lors de la creation du blog ', e);
    }
});
//Renvoie tous les blogs créer par un user (URL)
app.get('/api/userblog', async (req, res) => {
    let id;

    try {
        id = req.query.iduser;
    } catch (e) {
        res.status(500).send({message: "formatage de la requete incorrect"});
    }

    try{
        const query = 'call getBlogsFromUser('+convertUnicode(id)+')';
        const result = await requeteOut(query);
        res.json(result);
    } catch (e) {
        res.status(404).send({message : "blogs non trouvé"});
        console.error('erreur lors de la recherche de blog fait par le user', e);
    }
});
//Renvoie tous les blogs accessible par l'utilisateur (URL)
app.get('/api/accessibleblog', async (req, res) => {
    let id;

    try {
        id = req.query.iduser;
    } catch (e) {
        res.status(500).send({message: "formatage de la requete incorrect"});
    }

    try{
        const query = 'call getBlogsAccessibleFromUser('+convertUnicode(id)+')';
        const result = await requeteOut(query);
        res.json(result);
    } catch (e) {
        res.status(404).send({message : "blogs non trouvé"});
        console.error('erreur lors de la recherche de blog accessible par le user', e);
    }
});
//Supprime un blog (URL)
app.get('/api/deleteblog', async (req, res) => {
    let id;

    try {
        id = req.query.idblog;
    } catch (e) {
        res.status(500).send({message: "formatage de la requete incorrect"});
    }

    try{
        const query = 'call delete_blog('+convertUnicode(id)+')';
        await requeteIn(query);
        res.status(200).send({message : "supression OK"});
    } catch (e) {
        res.status(404).send({message : "echec de la supression"});
        console.error('erreur lors de la suppression de blog ', e);
    }
});


module.exports = app;
