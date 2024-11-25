
class  Chat_dto {


    constructor(id_chat,valeur_favorite,est_archive,est_activer=true,nom){
        this.id_chat= id_chat ;
         this.valeur_favorite = valeur_favorite;
         this.est_archive = est_archive;
         this.est_activer= est_activer;
         this.nom = nom;
    }
   
}
   module.exports = Chat_dto;