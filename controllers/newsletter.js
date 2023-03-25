const service = require("../service/service");
const newsletterMdls = require('../models/newsletter');
const cron = require('node-cron');

class Commande {
    constructor() {

    }
    
    static getInstance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new Commande();
        return this._instance;
    }

    creer_newsletter = async (req, res) =>{
        console.log("Création newsletter");
        let {objet, contenu, titre, date_d_envoie} = req.body;
        let datetime = new Date();
        date_d_envoie = service.formatDate(datetime);
        try {
            //let content ='<pre style="font-family: sans-serif;">'+ contenu +'</pre><br><br> Voici l\'adresse du support en ligne si vous rencontrez un problème :vanjasoariziky@gmail.com<br><br><br> Cordialement<br><br>L\'équipe En’Joy & Job<br>+33637349899<br><br>💎Précieusement💎';
            let creation = await newsletterMdls.insertion(objet, contenu, titre, date_d_envoie, "Tout");
            self.creation_cron(datetime)
            res.send(creation);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    update = async(req, res) => {
        console.log(req.body);
        let {id, objet, contenu, titre, date_d_envoie} = req.body;
        try {
            let newsletter = await newsletterMdls.get(id);
            if(newsletter.envoyer === 0){
                date_d_envoie = service.formatDate(new Date(date_d_envoie))
                let update_newsletter = await newsletterMdls.update(id, objet, contenu, titre, date_d_envoie, "tout");
                if(update_newsletter.affectedRows == 1) return res.send("Modification réussie")
                res.status(500).send("Modification échec");
            }
            else{
                res.send("Newsletter non modifiable")
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    sendMail = async(req, res) => {
        console.log("Send mail : " , req.body);
        let {email, objet, contenu} = req.body;
        try {
            await service.envoyer_mail(email, objet, contenu);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    list = async (req, res) => {
        try {
            let listNewsletter = await newsletterMdls.getList();
            res.send(listNewsletter);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    delete = async (req, res) => {
        let id = parseInt(req.body.id);
        try {
            let delete_newsletter = await newsletterMdls.delete(id);
            if(delete_newsletter.affectedRows == 1) return res.send("Suppression réussie")
            res.status(500).send("Suppression échec");
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    creation_cron = (date)=>{
        let m = date.getMonth() +1 , d = date.getDate(), h = date.getHours(), min = date.getMinutes(), sec = date.getSeconds();
        console.log(sec+" "+min+" "+h+" "+d+" "+m+' *');
        cron.schedule(sec+" "+min+" "+h+" "+d+" "+m+' *', () => {
            console.log("running a task at : " + date);
        });
    }

}

let self = Commande.getInstance()
module.exports = self;
