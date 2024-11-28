function recupererId(id) {
    window.location.href = "/animal-" + id;
}

var formulaire = document.forms['mise-en-adoption'];

const regexVirgule = new RegExp('\,');
const regexCourriel = new RegExp('^[a-zA-Z0-9\.\-_]+@([a-zA-Z0-9\-_]+\.)+[a-zA-Z0-9\-_]+$');
const regexCp = new RegExp('^[A-Za-z]{1}\d{1}[A-Za-z]{1} ?\d{1}[A-Za-z]{1}\d{1}$');
const msgErrVirgule = "✗ Ne doit pas contenir une virgule (,).";
const msgErrAge = "✗ L'âge entré doit être entre 0 et 30 (inclusivement).";
const msgErrCourriel = "✗ Le format du courriel entre n'est pas valide.";
const msgErrCp = "✗ Le code postal ne respecte pas le format \"A1B 1C1\" ou \"A1B1C1\".";
const msgErrLongueurChamp = "✗ Ce champ ne doit pas dépasser ";
const msgChampRequis = "✗ Ce champ est requis !";
const msgChampValide = "✓ L'information entrée est conforme au format demandé !";
const msgErrForm = "ERREUR : Le formulaire n'est pas comforme. Veuillez corriger les champs ayant des erreurs !";


formulaire.addEventListener('submit', function e(event) {
    if (!validerNom(event.target[0].value) || !validerEspece(event.target[1].value) || !validerRace(event.target[2].value)
            || !validerAge(event.target[3].value) || !validerDesc(event.target[4].value) || !validerCourriel(event.target[5].value)
            || !validerAdresse(event.target[6].value) || !validerVille(event.target[7].value) || !validerCp(event.target[8].value)) {
        document.getElementById('err-form').innerHTML = msgErrForm;
    }
    if (!validerNom(event.target[0].value)) {
        event.preventDefault();
    }
    if (!validerEspece(event.target[1].value)) {
        event.preventDefault();
    }
    if (!validerRace(event.target[2].value)) {
        event.preventDefault();
    }
    if (!validerAge(event.target[3].value)) {
        event.preventDefault();
    }
    if (!validerDesc(event.target[4].value)) {
        event.preventDefault();
    }
    if (!validerCourriel(event.target[5].value)) {
        event.preventDefault();
    }
    if (!validerAdresse(event.target[6].value)) {
        event.preventDefault();
    }
    if (!validerVille(event.target[7].value)) {
        event.preventDefault();
    }
    if (!validerCp(event.target[8].value)) {
        event.preventDefault();
    }
});


function validerNom(nom) {
    let estValide = true;
    if (nom === "") {
        document.getElementById('msg-nom').innerHTML = msgChampRequis;
        document.getElementById('conf-nom').innerHTML = "";
        estValide = false;
    } else if (regexVirgule.test(nom)) {
        document.getElementById('msg-nom').innerHTML = msgErrVirgule;
        document.getElementById('conf-nom').innerHTML = "";
        estValide = false;
    } else if (nom.length < 3 || nom.length > 20) {
        document.getElementById('msg-nom').innerHTML = "✗ Ce champ doit être entre 3 et 20 caractères.";
        document.getElementById('conf-nom').innerHTML = "";
        estValide = false;
    } else {
        document.getElementById('msg-nom').innerHTML = "";
        document.getElementById('conf-nom').innerHTML = msgChampValide;
    }
    return estValide;
}

function validerEspece(espece) {
    let estValide = true;
    if (espece === "") {
        document.getElementById('msg-espece').innerHTML = msgChampRequis;
        document.getElementById('conf-espece').innerHTML = "";
        estValide = false;
    } else if (regexVirgule.test(espece)) {
        document.getElementById('msg-espece').innerHTML = msgErrVirgule;
        document.getElementById('conf-espece').innerHTML = "";
        estValide = false;
    } else if (espece.length > 25) {
        document.getElementById('msg-espece').innerHTML = msgErrLongueurChamp + "25 caractères.";
        document.getElementById('conf-espece').innerHTML = "";
        estValide = false;
    } else {
        document.getElementById('msg-espece').innerHTML = "";
        document.getElementById('conf-espece').innerHTML = msgChampValide;
    }
    return estValide;
}

function validerRace(race) {
    let estValide = true;
    if (race === "") {
        document.getElementById('msg-race').innerHTML = msgChampRequis;
        document.getElementById('conf-race').innerHTML = "";
        estValide = false;
    } else if (regexVirgule.test(race)) {
        document.getElementById('msg-race').innerHTML = msgErrVirgule;
        document.getElementById('conf-race').innerHTML = "";
        estValide = false;
    } else if (race.length > 25) {
        document.getElementById('msg-race').innerHTML = msgErrLongueurChamp + "25 caractères.";
        document.getElementById('conf-race').innerHTML = "";
        estValide = false;
    } else {
        document.getElementById('msg-race').innerHTML = "";
        document.getElementById('conf-race').innerHTML = msgChampValide;
    }
    return estValide;
}

function validerAge(age) {
    let estValide = true;
    if (age === "") {
        document.getElementById('msg-age').innerHTML = msgChampRequis;
        document.getElementById('conf-age').innerHTML = "";
        estValide = false;
    } else if (age < 0 || age > 30) {
        document.getElementById('msg-age').innerHTML = msgErrAge;
        document.getElementById('conf-age').innerHTML = "";
        estValide = false;
    } else {
        document.getElementById('msg-age').innerHTML = "";
        document.getElementById('conf-age').innerHTML = msgChampValide;
    }
    return estValide;
}

function validerDesc(desc) {
    let estValide = true;
    if (desc === "") {
        document.getElementById('msg-desc').innerHTML = msgChampRequis;
        document.getElementById('conf-desc').innerHTML = "";
        estValide = false;
    } else if (regexVirgule.test(desc)) {
        document.getElementById('msg-desc').innerHTML = msgErrVirgule;
        document.getElementById('conf-desc').innerHTML = "";
        estValide = false;
    } else if (desc.length > 500) {
        document.getElementById('msg-desc').innerHTML = msgErrLongueurChamp + "500 caractères.";
        document.getElementById('conf-desc').innerHTML = "";
        estValide = false;
    } else {
        document.getElementById('msg-desc').innerHTML = "";
        document.getElementById('conf-desc').innerHTML = msgChampValide;
    }
    return estValide;
}

function validerCourriel(courriel) {
    let estValide = true;
    if (courriel === "") {
        document.getElementById('msg-courriel').innerHTML = msgChampRequis;
        document.getElementById('conf-courriel').innerHTML = "";
        estValide = false;
    } else if (!regexCourriel.test(courriel)) {
        document.getElementById('msg-courriel').innerHTML = msgErrCourriel;
        document.getElementById('conf-courriel').innerHTML = "";
        estValide = false;
    } else if (courriel.length > 80) {
        document.getElementById('msg-courriel').innerHTML = msgErrLongueurChamp + "80 caractères.";
        document.getElementById('conf-courriel').innerHTML = "";
        estValide = false;
    } else {
        document.getElementById('msg-courriel').innerHTML = "";
        document.getElementById('conf-courriel').innerHTML = msgChampValide;
    }
    return estValide;
}

function validerAdresse(adr) {
    let estValide = true;
    if (adr === "") {
        document.getElementById('msg-adr').innerHTML = msgChampRequis;
        document.getElementById('conf-adr').innerHTML = "";
        estValide = false;
    } else if (regexVirgule.test(adr)) {
        document.getElementById('msg-adr').innerHTML = msgErrVirgule;
        document.getElementById('conf-adr').innerHTML = "";
        estValide = false;
    } else if (adr.length > 75) {
        document.getElementById('msg-adr').innerHTML = msgErrLongueurChamp + "75 caractères.";
        document.getElementById('conf-adr').innerHTML = "";
        estValide = false;
    } else {
        document.getElementById('msg-adr').innerHTML = "";
        document.getElementById('conf-adr').innerHTML = msgChampValide;
    }
    return estValide;
}

function validerVille(ville) {
    let estValide = true;
    if (ville === "") {
        document.getElementById('msg-ville').innerHTML = msgChampRequis;
        document.getElementById('conf-ville').innerHTML = "";
        estValide = false;
    } else if (regexVirgule.test(ville)) {
        document.getElementById('msg-ville').innerHTML = msgErrVirgule;
        document.getElementById('conf-ville').innerHTML = "";
        estValide = false;
    } else if (ville.length > 75) {
        document.getElementById('msg-ville').innerHTML = msgErrLongueurChamp + "75 caractères.";
        document.getElementById('conf-ville').innerHTML = "";
        estValide = false;
    } else {
        document.getElementById('msg-ville').innerHTML = "";
        document.getElementById('conf-ville').innerHTML = msgChampValide;
    }
    return estValide;
}

function validerCp(cp) {
    let estValide = true;
    if (cp === "") {
        document.getElementById('msg-cp').innerHTML = msgChampRequis;
        document.getElementById('conf-cp').innerHTML = "";
        estValide = false;
    } else if (cp.length > 7) {
        document.getElementById('msg-cp').innerHTML = msgErrLongueurChamp + "7 caractères.";
        document.getElementById('conf-cp').innerHTML = "";
        estValide = false;
    } else if ((regexVirgule.test(cp))) {
        document.getElementById('msg-cp').innerHTML = msgErrVirgule;
        document.getElementById('conf-cp').innerHTML = "";
        estValide = false;
    } else if ((regexCp.test(cp))) {
        document.getElementById('msg-cp').innerHTML = msgErrCp;
        document.getElementById('conf-cp').innerHTML = "";
        estValide = false;
    } else {
        document.getElementById('msg-cp').innerHTML = "";
        document.getElementById('conf-cp').innerHTML = msgChampValide;
    }
    return estValide;
}

