

const mysql = require('mysql');
const {RowDataPacket} = require("mysql/lib/protocol/packets");

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'Meaux2Passe',
    database: 'triceratops_bd'
});

function connexion(){
    connection.connect((err) => {
        if (err) {
            console.error('Erreur de connexion à la base de données :', err);
            return;
        }
        console.log('Connecté à la base de données MySQL');
    });
}

async function requete(requete) {
    try {

        const result = await new Promise((resolve, reject) => {
            connection.query(requete, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.slice(0, results.length -1));
                }
            });
        });

        return result;
    } catch (error) {
        console.error('Erreur lors de l\'exécution de la requête :', error);
        throw error; // Renvoyer l'erreur pour la gérer à l'extérieur de la fonction
    }
}

function deconnecter() {
    connection.end((err) => {
        if (err) {
            console.error('Erreur lors de la fermeture de la connexion à la base de données :', err);
            return;
        }
        console.log('Connexion à la base de données fermée');
    });
}

module.exports = { connexion, deconnecter, requete };