/***
 *
 * Patch Fail SQL and special character
 *
 * @param chaine --> Texte a convertir en Unicode
 *
 **/
module.exports.convertUnicode = function (chaine) {
    let resultat = '';

    if(typeof chaine === "number"){
        return chaine
    }

    for (let i = 0; i < chaine.length; i++) {
        if(chaine.charAt(i) === '"'){
            resultat += '\"'; // échappe le quillement
        } else if(chaine.charAt(i) === "'"){
            resultat += "\\'"; // échappe l'apostrophe
        } else if (chaine.charAt(i) === "<") {
            resultat += '\\<'; // utilise l'entité HTML pour <
        } else if (chaine.charAt(i) === ">") {
            resultat += '\\>'; // utilise l'entité HTML pour >
        } else {
            resultat += chaine.charAt(i);
        }
    }

    // Debug
    console.log(chaine+" ---> "+resultat);

    return resultat;
}

