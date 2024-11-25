
class  Chat_dto {


    constructor(id_chat,valeur_favorite,est_archive,est_activer,membres,nom,description,administrateur,createAt){
         this.id_chat= id_chat ,
         this.valeur_favorite = valeur_favorite;
         this.est_archive = est_archive;
         this.est_activer = est_activer;
         this.nom = nom;
         this.membres= membres;
         this.description=description;
         this.administrateur= administrateur;
         this.createAt= createAt;
    }
   
}
   module.exports = Chat_dto;