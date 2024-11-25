const message_media_Model= require ("../models/messages_media")
const  message_string_Model = require ("../models/messages_string")
const messagemedia_and_string_Model = require("../models/messagesmedia_and_string")
const message_string =  require("../classes/messageStringClasse")
const message_media = require("../classes/messageMediaClasse")
const message_string_and_media =require("../classes/messageStringandMediaClasse")







function chatFactory(chat_id,contenu,media,etat,id_expediteur,est_activer,type) {
    switch (type) {
        case 'string':
            return new message_string(chat_id,contenu,etat,id_expediteur,est_activer);
        case 'media':
            return new message_media(chat_id,media,etat,id_expediteur,est_activer);
        case 'string_and_media':
            return new message_string_and_media(chat_id,contenu,media,etat,id_expediteur,est_activer);
        
        default:
            throw new Error('type de message non reconnue');
    }
}

// creation de message 
const  createmessage = async(req,res)  => {
    try{
   
    const {chatid,contenu,etat,media,id_expediteur,type} = req.body
       console.log("etat envoyer a factory"+etat)
    let messages = chatFactory(chatid,contenu,media,etat,id_expediteur,true,type)
    let response=""
      
    if( req.body.type=="string"){

      
     response= await  messages.envoyer_message(messages)

    }
    if( req.body.type=="media"){
       
        response= await  messages.envoyer_message(messages)
    }
    if( req.body.type=="string_and_media"){
        response= await  messages.envoyer_message(messages)
      
    }
if(response ===""){
      response= "le type fourni ne correspond a aucun de notre repertoire"
}
       res.status(200).json(response)
     }
     catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}


// get message

const getmessages= async (req, res)  => {


    const {chatid} = req.params;


    try {

        const messages_string= new  message_string
        const messages_media=  new message_media
        const messages_string_and_media = new message_string_and_media
        let response_string = await messages_string.liste_messages(chatid)
        let response_media= await messages_media.liste_messages(chatid)
        let response_string_and_media= await messages_string_and_media.liste_messages(chatid)

        const messages_total= [...response_string, ...response_media, ...response_string_and_media]

        messages_total.sort((a,b)=>new Date(a.createdAt) - new Date(b.createdAt))



        res.status(200).json(messages_total)
    }
    catch(error){
        console.log(error)
        res.status(500).json(error)
    }


}





module.exports = {createmessage, getmessages};