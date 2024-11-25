const Message = require("./messageClasse")
const  message_string_Model = require ("../models/messages_string")

class  MessageString extends Message {

    constructor(chatid="",contenu="",etat="",id_expediteur="",est_activer=true){
        super(chatid,contenu,etat,id_expediteur,est_activer)
    }

   async  envoyer_message(messages){
        let newmessage =  new message_string_Model(messages)
      const  response =  await newmessage.save()
        return response
    }

  async  liste_messages(chatid){
        const messages_string= await message_string_Model.find({_id:chatid,etat:false})
        return messages_string;
    }

    liste_messages_non_lue(){}

    modifier_message(){}

    nombre_message_non_lue(){}




}

   module.exports = MessageString;