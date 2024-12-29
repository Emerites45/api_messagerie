
class  Chat {


    constructor(valeur_favorite,est_archive,est_activer,membres,type){
         this.valeur_favorite = valeur_favorite;
         this.est_archive = est_archive;
         this.membres = membres;
         this.type= type;
         this.est_activer= est_activer
    }
    cree_chat(){}

    ajouter_chat_favoris(){}
    liste_chat(){}

    liste_chat_archive(){}

    modifier_chat(){}

   
}
   module.exports = Chat;