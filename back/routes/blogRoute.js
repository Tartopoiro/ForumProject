const {requeteOut, requeteIn} = require("../mysqlConnection");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.get('/api/blog', async (req, res) => {
    const id = req.query.idblog;
    try{
        const query = 'call getBlogFromId(\''+id+'\')';
        const result = await requeteOut(query);
        res.json(result);
    } catch (e) {
        res.status(404).send({message : "blog non trouvé"});
        console.error('erreur lors de la recherche de blog ', e);
    }
});

app.post('/api/blog', bodyParser.json(), async (req,res)=>{
    const public = req.body['Public'];
    const titre = req.body['Titre'];
    const user = req.body['IdUser'];
    const descriptif = req.body['Descriptif'];

    try{
        const query = 'CALL create_blog(\''+public+'\',\''+titre+'\',\''+descriptif+'\','+user+')';
        await requeteIn(query);
        res.status(200).send({message : "Blog created"});
    }catch (e) {
        res.status(500).send({message : "query failed"});
        console.error('erreur lors de la creation du blog ', e);
    }
});

app.patch('/api/blog', bodyParser.json(), async (req,res)=>{
    const public = req.body['Public'];
    const titre = req.body['Titre'];
    const blog = req.body['IdBlog'];
    const descriptif = req.body['Descriptif'];

    try{
        const query = 'CALL update_blog(\''+blog+'\',\''+public+'\',\''+titre+'\',\''+descriptif+'\')';
        await requeteIn(query);
        res.status(200).send({message : "Blog created"});
    }catch (e) {
        res.status(500).send({message : "query failed"});
        console.error('erreur lors de la creation du blog ', e);
    }
});

app.get('/api/userblog', async (req, res) => {
    const id = req.query.iduser;
    try{
        const query = 'call getBlogsFromUser(\''+id+'\')';
        const result = await requeteOut(query);
        res.json(result);
    } catch (e) {
        res.status(404).send({message : "blogs non trouvé"});
        console.error('erreur lors de la recherche de blog fait par le user', e);
    }
});

app.get('/api/deleteblog', async (req, res) => {
    const id = req.query.idblog;
    try{
        const query = 'call delete_blog(\''+id+'\')';
        const result = await requeteOut(query);
        res.json(result);
    } catch (e) {
        res.status(404).send({message : "echec de la supression"});
        console.error('erreur lors de la suppression de blog ', e);
    }
});



