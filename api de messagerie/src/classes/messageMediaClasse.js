
const Message = require("../classes/messageClasse")
const message_media_Model= require ("../models/messages_media")

class  MessageMedia extends Message {

    constructor(chatid="",media=[],etat=false,id_expediteur="",est_activer=true){
        super(chatid,"",etat,id_expediteur,est_activer)
        this.media = media;
    }

    async envoyer_message(messages){
        let newmessage =  new message_media_Model(messages)
        console.log("arriver: "+messages.id_expediteur)
     const   response =  await newmessage.save()
        return response
      
    }

   async liste_messages(chatid){
        const messages_media= await message_media_Model.find({_id:chatid,etat:false})
        return messages_media;
    }

    liste_messages_non_lue(){}

    modifier_message(){}

    supprimer_message(){}

    liker(){}

    epingler(){}

    signaler(){}

    nombre_message_non_lue(){}




}

   module.exports = MessageMedia;