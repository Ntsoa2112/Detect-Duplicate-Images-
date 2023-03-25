const jwt = require("jsonwebtoken");
const SECRET = "mykey";
const fs = require("fs");
const bcrypt = require("bcrypt");
const userMdls = require("../models/user");
const saltRounds = 10;
const nodemailer = require("nodemailer")

module.exports = {
    generer_token: (id, email) => {
        const token = jwt.sign(
            {
                id: id,
                email: email,
            },
            SECRET,
            { 
                expiresIn: "2d" 
            }
        );
        return token;
    },

    uploadFile: (chemin, fichier, add_name) => {
        return new Promise((resolve, reject) => {
            let uploadPath, current_time = new Date().getTime(), nom_img;
    
            if (!fichier) {
              reject("No files were uploaded.");
            }
        
            let fichier_name = fichier.name.split(".");
            let ext = fichier_name[fichier_name.length - 1];
            nom_img = add_name + "_iTeams-s_" + current_time + "." + ext;
            uploadPath = chemin + nom_img;
        
            fichier.mv(uploadPath, function (err) {
              if (err) reject(err);
              resolve(uploadPath)
            });
        })
    },
    
    deleteFile: (path) => {
        if (path) {
            try {
            fs.unlink(path, (err => {
                if (err) throw err;
                else {
                    return true;
                }
                }));            
            } catch (err) {
            throw err;
            }
        } else {
            throw "Aucun chemin";
        }
    },

    register_user: (email, mdp, nom, prenom, privilege) => {
        return new Promise((resolve, reject) => {
            bcrypt.hash(mdp, saltRounds, async function(err, hash){
                if (err) res.status(500).send(err);
                try {
                    let insertion = await userMdls.insertion(email, hash, nom, prenom, privilege);
                    resolve(insertion);
                } catch (error) {
                    reject(error.message);
                }
            })
        })
    },

    envoyer_mail: function (email, objet, contenu, filename = '', path = '') {
        
        var monMail = process.env.email;
        var transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: monMail,
            pass: process.env.password_email,
          },
        });
        
        

        var mailOptions;

        if(filename && path){
            mailOptions = {
                from: monMail,
                to: email,
                subject: objet,
                html: contenu,
                attachments: [
                  {   // file on disk as an attachment
                      filename: filename,
                      path: path // stream this file
                  },
                ]
            };
        }
        else{
            mailOptions = {
                from: monMail,
                to: email,
                subject: objet,
                html: contenu,
            };
        }
    
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log("Email not sent: " + error);
            return false;
          } else {
            console.log("Email sent: " + info.response);
            return true;
          }
        });
        return true;
    },

    formatDate: function(date){
        let y = date.getFullYear(), m = date.getMonth() +1 , d = date.getDate(), h = date.getHours(), min = date.getMinutes(), sec = date.getSeconds();
        return y+'-'+m+'-'+d+' '+h+':'+min+':'+sec;
    }
}
