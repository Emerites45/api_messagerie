
class  Utilisateur {


    constructor(_id,pseudo,adresse_mail,role,photo_profil){
         this._id = _id;
         this.pseudo = pseudo;
         this.adresse_mail = adresse_mail;
         this.role=role;
         this.photo_profil= photo_profil;
    }
}
   module.exports = Utilisateur;