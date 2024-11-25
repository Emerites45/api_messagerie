const Message = require("../classes/messageClasse")
const messagemedia_and_string_Model = require("../models/messagesmedia_and_string")

class  MessageStringAndMedia extends Message {

    constructor(chatid="",contenu="",media=[],etat=false,id_expediteur="",est_activer=true){
        super(chatid,contenu,etat,id_expediteur,est_activer)
        this.media = media 
    }

  async  envoyer_message(messages){
        let newmessage =  new messagemedia_and_string_Model(messages)
       const response =  await newmessage.save()
        return response
    }

  async   liste_messages(chatid){
        const messages_string_and_media = await messagemedia_and_string_Model.find({_id:chatid,etat:false})
        return messages_string_and_media;
    }

    liste_messages_non_lue(){}

    modifier_message(){}

    supprimer_message(){}

    liker(){}

    epingler(){}

    signaler(){}

    nombre_message_non_lue(){}




}

   module.exports = MessageStringAndMedia;