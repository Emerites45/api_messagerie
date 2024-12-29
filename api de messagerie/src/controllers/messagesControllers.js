const message_media_Model= require ("../models/messages_media")
const  message_string_Model = require ("../models/messages_string")
const messagemedia_and_string_Model = require("../models/messagesmedia_and_string")
const message_string =  require("../classes/messageStringClasse")
const message_media = require("../classes/messageMediaClasse")
const message_string_and_media =require("../classes/messageStringandMediaClasse")







function chatFactory(chat_id,contenu,media,id_expediteur,est_activer,type) {
    switch (type) {
        case 'string':
            return new message_string(chat_id,contenu,[id_expediteur],id_expediteur,false,est_activer,[]);
        case 'media':
            return new message_media(chat_id,media,[id_expediteur],id_expediteur,false,est_activer,[]);
        case 'string_and_media':
            return new message_string_and_media(chat_id,contenu,media,[id_expediteur],id_expediteur,false,est_activer,[]);
        
        default:
            throw new Error('type de message non reconnue');
    }
}

// creation de message 
const  createmessage = async(req,res)  => {
    try{
   
    const {chatid,contenu,media,id_expediteur,type} = req.body
      
    let messages = chatFactory(chatid,contenu,media,id_expediteur,true,type)
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


    const chatid = req.params.chatid;
    const userid= req.params.userid


    try {

        const messages_string= new  message_string
        const messages_media=  new message_media
        const messages_string_and_media = new message_string_and_media
        let response_string = await messages_string.liste_messages(chatid,userid)
       
        let response_media= await messages_media.liste_messages(chatid,userid)
        let response_string_and_media= await messages_string_and_media.liste_messages(chatid,userid)

        const messages_total= [...response_string, ...response_media, ...response_string_and_media]

        messages_total.sort((a,b)=>new Date(a.createdAt) - new Date(b.createdAt))



        res.status(200).json(messages_total)
    }
    catch(error){
        console.log(error)
        res.status(500).json(error)
    }

}  




// get message no read

const getmessagesnoread= async (req, res)  => {


    const chatid = req.params.chatid;
    const  userid = req.params.userid;


    try {

        const messages_string= new  message_string
        const messages_media=  new message_media
        const messages_string_and_media = new message_string_and_media
        let response_string = await messages_string.liste_messages_non_lue(chatid,userid)
       
        let response_media= await messages_media.liste_messages_non_lue(chatid,userid)
        let response_string_and_media= await messages_string_and_media.liste_messages_non_lue(chatid,userid)
        const messages_total= [...response_string, ...response_media, ...response_string_and_media]

          messages_total.sort((a,b)=>new Date(a.createdAt) - new Date(b.createdAt))



        res.status(200).json(messages_total)
    }
    catch(error){
        console.log(error)
        res.status(500).json(error)
    }

}  




const getmessagebyid =  async(req,res)  => {
    const {messageID} = req.params
    let response
    try{
           const message = new  message_string
           console.log("jarrive cas mm")
         const response= await message.liste_message_by_id(messageID)
         res.status(200).json(response)


    }
    catch(error){
        console.log(error)
        res.status(500).json(error)
    }

}


const updatemessage =  async(req,res)  => {
    const messageid = req.params.messageid
    const type= req.params.type
   
    try{

        if(type === "string"){
        const messages_string= new  message_string()

       await messages_string.modifier_message(messageid,req.body.contenu) 
    }
    if(type === "string_and_media"){
        const messages_string_and_media = new message_string_and_media

      await  messages_string_and_media.modifier_message(messageid,req.body.contenu)
    }

    res.status(200).json("modification terminer")
    }
    catch(error){
        console.log(error)
        res.status(500).json(error)
    }

}


const deletemessage =  async(req,res)  => {
    const messageid = req.params.messageid
    const type= req.params.type
   
    try{

        if(type === "string"){
        const messages_string= new  message_string

           await   messages_string.supprimer_message(messageid)
        }
        if(type === "media"){
        const messages_media=  new message_media
            await messages_media.supprimer_message(messageid)
        }
        if(type === "string_and_media"){
        const messages_string_and_media = new message_string_and_media
            await  messages_string_and_media.supprimer_message(messageid)
        }

        res.status(200).json("suppression terminer")
    }
    catch(error){
        console.log(error)
        res.status(500).json(error)
    }

}



const delete_message_for =  async(req,res)  => {
    const messageid = req.params.messageid
    const userid= req.params.userid
    const type= req.params.type
    let response=""
    try{
     

        if( type === "string"){
        const messages_string= new  message_string
           await  messages_string.supprimer_message_pour(messageid,userid)
       
        }
        if(type === "media" ){
        const messages_media=  new message_media
            await messages_media.supprimer_message_pour(messageid,userid)
        }
        if(type === "string_and_media"){
        const messages_string_and_media = new message_string_and_media
          await messages_string_and_media.supprimer_message_pour(messageid,userid)
        
        }
         
        res.status(200).json("votre message e bien été supprimer")


        


    }
    catch(error){
        console.log(error)
        res.status(500).json(error)
    }

}


const epingler_message =  async(req,res)  => {
    const messageid = req.params.messageid
    const type= req.params.type

    try{

        if( type === "string"){
        const messages_string= new  message_string
         messages_string.epingler_message(messageid)
       
        }
        if(type === "media" ){
        const messages_media=  new message_media
           messages_media.epingler_message(messageid)
        }
        if(type === "string_and_media"){
        const messages_string_and_media = new message_string_and_media
         await messages_string_and_media.epingler_message(messageid)
        
        }
         
        res.status(200).json("votre message e bien été épingler")


    }
    catch(error){
        console.log(error)
        res.status(500).json(error)
    }


}




module.exports = {createmessage, getmessages,  getmessagebyid, epingler_message,delete_message_for,getmessagesnoread,updatemessage,deletemessage};