//Classe de connexion à la BdD, permet egalement l'execution de requete

const mysql = require('mysql');
const {RowDataPacket} = require("mysql/lib/protocol/packets");
//Parametre de connexion
const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'Meaux2Passe',
    database: 'triceratops_bd'
});
//Fonction de connexion avec gestion d'erreur
function connexion(){
    connection.connect((err) => {
        if (err) {
            console.error('Erreur de connexion à la base de données :', err);
            return;
        }
        console.log('Connecté à la base de données MySQL');
    });
}
//Execute une requete en parametre avec la mise en forme du resultat
async function requeteOut(requete) {
    try {

        const result = await new Promise((resolve, reject) => {
            connection.query(requete, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.slice(0, results.length -1));
                }
            });
        });

        return result;
    } catch (error) {
        console.error('Erreur lors de l exécution de la requête :', error);
        throw error;
    }
}
//Execute une requete en parametre sans resultats hormis l'erreur si necessaire
async function requeteIn(requete) {
    try {
        await new Promise((resolve, reject) => {
            connection.query(requete, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    } catch (error) {
        throw error;
    }
}
// deconnecte la BdD
function deconnecter() {
    connection.end((err) => {
        if (err) {
            console.error('Erreur lors de la fermeture de la connexion à la base de données :', err);
            return;
        }
        console.log('Connexion à la base de données fermée');
    });
}

module.exports = { connexion, deconnecter, requeteOut, requeteIn };