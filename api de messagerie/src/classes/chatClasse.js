
class  Chat {


    constructor(valeur_favorite,est_archive,membres,supprimer_pour,associer_au_dossier){
         this.valeur_favorite = valeur_favorite;
         this.est_archive = est_archive;
         this.membres = membres;
         this.supprimer_pour= supprimer_pour;
         this.associer_au_dossier = associer_au_dossier

    }
    cree_chat(){}
    ajouter_au_dossier(){}
    ajouter_chat_favoris(){}
    liste_chat(){}

    liste_chat_archive(){}

    modifier_chat(){}
    supprimer_chat(){}

   
}
   module.exports = Chat;