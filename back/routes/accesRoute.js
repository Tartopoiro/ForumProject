const {requeteOut, requeteIn} = require("../mysqlConnection");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {convertUnicode} = require("../convertUnicode");


app.get('/api/acces', async (req, res) => {
    const id = req.query.idblog;
    try{
        const query = 'call getAccessFromBlog('+convertUnicode(id)+')';
        const result = await requeteOut(query);
        res.json(result);
    } catch (e) {
        res.status(404).send({message : "accès non trouvé"});
        console.error('erreur lors de la recherche des accès ', e);
    }
});
app.post('/api/acces', bodyParser.json(), async (req,res)=>{
    const user = req.body['IdUser'];
    const blog = req.body['IdBlog'];

    try{
        const query = 'CALL create_access('+convertUnicode(blog)+','+convertUnicode(user)+')';
        await requeteIn(query);
        res.status(200).send({message : "access created"});
    }catch (e) {
        res.status(500).send({message : "query failed"});
        console.error('erreur lors de la creation du blog ', e);
    }
});

app.delete('/api/acces', bodyParser.json(), async (req,res)=>{
    const user = req.body['IdUser'];
    const blog = req.body['IdBlog'];

    try{
        const query = 'CALL delete_access('+convertUnicode(blog)+','+convertUnicode(user)+')';
        await requeteIn(query);
        res.status(200).send({message : "access deleted"});
    }catch (e) {
        res.status(500).send({message : "query failed"});
        console.error('erreur lors de la creation du blog ', e);
    }
});

module.exports = app;