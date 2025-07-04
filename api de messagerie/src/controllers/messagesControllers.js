
const message_string =  require("../classes/messageStringClasse")
const message_media = require("../classes/messageMediaClasse")
const message_string_and_media =require("../classes/messageStringandMediaClasse")
const message_link =  require("../classes/messageLinkClasse")







function chatFactory(chat_id,contenu,media,id_expediteur,type) {
    switch (type) {
        case 'string':
            return new message_string(chat_id,contenu,[id_expediteur],id_expediteur,false,false,[]);
        case 'link':
            return new message_link(chat_id,contenu,[id_expediteur],id_expediteur,false,false,[]);
        case 'media':
            return new message_media(chat_id,media,[id_expediteur],id_expediteur,false,false,[]);
        case 'string_and_media':
            return new message_string_and_media(chat_id,contenu,media,[id_expediteur],id_expediteur,false,false,[]);
        
        default:
            throw new Error('type de message non reconnue');
    }
}

// creation de message 
const  createmessage = async(req,res)  => {
    try{
   
    const {chatid,contenu,media,id_expediteur,type} = req.body
      
    let messages = chatFactory(chatid,contenu,media,id_expediteur,type)
    let response=""
      
  
         await  messages.envoyer_message(messages).then(() => response='Message sauvegardé avec succès !')
         .catch(err => {
          console.error('Erreur de validation :', err.message);
          response = err.message;
          
        })
   
       res.json({response});
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
        const messages_link= new  message_link
        const messages_media=  new message_media
        const messages_string_and_media = new message_string_and_media
        let response_string = await messages_string.liste_messages(chatid,userid)
        let response_link = await messages_link.liste_messages(chatid,userid)
        let response_media= await messages_media.liste_messages(chatid,userid)
        let response_string_and_media= await messages_string_and_media.liste_messages(chatid,userid)

        const messages_total= [...response_string, ...response_media, ...response_link , ...response_string_and_media]

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
        const messages_link= new  message_link
        const messages_media=  new message_media
        const messages_string_and_media = new message_string_and_media
        let response_string = await messages_string.liste_messages_non_lue(chatid,userid)
        let response_link =  await messages_link.liste_messages_non_lue(chatid,userid)
        let response_media= [] // await messages_media.liste_messages_non_lue(chatid,userid)
        let response_string_and_media=  []//await messages_string_and_media.liste_messages_non_lue(chatid,userid)
        const messages_total= [...response_string, ...response_media, ...response_link , ...response_string_and_media]

          messages_total.sort((a,b)=>new Date(a.createdAt) - new Date(b.createdAt))



        res.status(200).json(messages_total)
    }
    catch(error){
        console.log(error)
        res.status(500).json(error)
    }

}  


// get message id

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


//update message

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
        if( type === "link"){
            const messages_link= new  message_link
             messages_link.epingler_message(messageid)
           
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