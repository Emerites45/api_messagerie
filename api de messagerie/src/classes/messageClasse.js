
class  Message {

    constructor(chatid,contenu,lu_par,id_expediteur,est_epingle,est_activer,supprimer_pour){
         this.chatid = chatid;
         this.contenu = contenu;
         this.lu_par = lu_par;
       
         this.est_epingle = est_epingle;
         this.est_activer= est_activer
         this.id_expediteur = id_expediteur;
         this.supprimer_pour= supprimer_pour;
    }

    envoyer_message(){}

    liste_messages(){}

    liste_messages_non_lue(){}

    modifier_message(){}

    supprimer_message(){}

   

    epingler(){}

    signaler(){}

    nombre_message_non_lue(){}




}

   module.exports = Message;