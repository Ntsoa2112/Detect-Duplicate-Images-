const db = require('../service/connect');

module.exports = {

    insertion: (objet, contenu, titre, date_d_envoie, tag_email) => {
        //contenu = contenu.toString()
        console.log(contenu);
        //date_d_envoie = "'"+date_d_envoie+"'"
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO newsletter(objet, contenu, titre, date_d_envoie, tag_email) VALUES(?,?,?,?,?)",
            [objet, contenu, titre, date_d_envoie,  tag_email], function(err, resultats){
              if(err) reject(err);
              resolve("Success insertion");
            })
        })
    },

    get: (id) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM newsletter WHERE id = ?", [id], function(err, resultats){
              if(err) reject(new Error("Erreur ressource get newsletter"));
              resolve(resultats[0]);
            })
        })
    },

    update: (id, objet, contenu, titre, date_d_envoie, tag_email) => {
        return new Promise((resolve, reject) => {
            db.query("UPDATE newsletter SET objet=?, contenu=?, titre=?, date_d_envoie=?, tag_email=? WHERE id = ?", [objet, contenu, titre, date_d_envoie, tag_email, id], function(err, resultats){
              if(err) reject(new Error("Erreur update newsletter"));
              resolve(resultats);
            })
        })
    },

    getList: () => {
        return new Promise((resolve, reject) => {
            db.query("SELECT id, tag_email, objet, contenu, titre,envoyer, nbr_envoyer, DATE_FORMAT(date_d_envoie, '%D %b %Y à %H:%i:%s') AS date_d_envoie, date_d_envoie def_date FROM newsletter", function(err, resultats){
              if(err) reject(new Error("Erreur ressource list newsletter"));
              resolve(resultats);
            })
        })
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM newsletter WHERE id = ?", [id], function(err, resultats){
              if(err) reject(new Error("Erreur suppression newsletter"));
              resolve(resultats);
            })
        })
    },
}