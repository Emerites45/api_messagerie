
class  Message {

    constructor(chatid,contenu,etat,id_expediteur,est_activer){
         this.chatid = chatid;
         this.contenu = contenu;
         this.etat = etat;
         this.est_activer= est_activer
         this.id_expediteur = id_expediteur;
    }

    envoyer_message(){}

    liste_messages(){}

    liste_messages_non_lue(){}

    modifier_message(){}

    supprimer_message(){}

    liker(){}

    epingler(){}

    signaler(){}

    nombre_message_non_lue(){}




}

   module.exports = Message;