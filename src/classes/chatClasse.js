
class  Chat {


    constructor(valeur_favorite,est_archive_par,membres,supprimer_pour,associer_au_dossier){
         this.valeur_favorite = valeur_favorite;
         this.est_archive_par = est_archive_par;
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