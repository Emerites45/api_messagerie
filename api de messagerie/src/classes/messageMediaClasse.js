
const Message = require("../classes/messageClasse")
const message_media_Model= require ("../models/messages_media")
let message_media_dto = require("../dto/message_media_Dto")

class  MessageMedia extends Message {

    constructor(chatid="",media=[],lu_par=[],id_expediteur="",est_epingle=false,est_activer=true,supprimer_pour=[]){
        super(chatid,"",lu_par,id_expediteur,est_epingle,est_activer,supprimer_pour)
        this.media = media;
    }

    async envoyer_message(messages){

        let lu = []
        lu.push(messages.id_expediteur)
        for(const media of  messages.media){

            let message = {chatid: messages.chatid,media: media,lu_par:lu,id_expediteur:messages.id_expediteur,
                           est_epingle: messages.est_epingle,
                           est_activer:messages.est_activer,
                           supprimer_pour:messages.supprimer_pour
                         } 

        let newmessage =  new message_media_Model(message)
        const   response =  await newmessage.save()
        }
    
        return "message_enregistrer"
      
    }

   async liste_messages(chatid,user_id){

    let liste_message_media= []
    console.log("userid: "+user_id)
        const messages_media= await message_media_Model.find({chatid:chatid,lu_par:{$in:[user_id]}})
       console.log("jarrive ici et le nombre de message : "+messages_media.length)
        for ( const message of messages_media ){
              const messages= new message_media_dto(message.id,message.chatid,message.media,message.est_activer,message.est_epingle,message.id_expediteur,"media",message.createdAt) 
                liste_message_media.push(messages);
                console.log( "le message sous forme dto : "+messages.est_active)
            }
        return liste_message_media;
    }

    async liste_messages_non_lue(chatid,user_id){
        let liste_message_media= []
        let lu= []
        const messages_media= await message_media_Model.find({chatid:chatid,lu_par:{$nin:[user_id]}})
       console.log("jarrive ici et le nombre de message : "+messages_media.length)
        for ( const message of messages_media ){
            lu.push(user_id)
            const element= {$set:message} 
            await messagemedia_and_string_Model.updateOne({_id:message.id},element);
              const messages= new message_media_dto(message.id,message.chatid,message.media,message.est_activer,message.est_epingle,message.id_expediteur,"media",message.createdAt) 
                liste_message_media.push(messages);
                console.log( "le message sous forme dto : "+messages.est_active)
            }
        return liste_message_media;
    }

  
    async  supprimer_message(messageid){
        const objectid= new ObjectId(messageid)
        const messages_string= await  message_media_Model.find({_id:objectid})
        messages_string.est_activer= false;
       
        const element= {$set:messages_string} 
         const result = await  message_media_Model.updateOne({_id:messageid},element);
         return result;
          
      }

   async supprimer_message_pour(messageid,user_id){
        const objectid= new ObjectId(messageid)
        let users =[]
          let  present = false
        const messages_string= await message_media_Model.findOne({_id:objectid})
        users = messages_string.supprimer_pour
        console.log("je suis le tableau de ceux qui ne veulent pas du message "+ messages_string.contenu)

        for (const user of users ){
            if(user === user_id)
            present =true;
        }
        if(present === false)
        users.push(user_id)

        messages_string.supprimer_pour = users
       
        const element= {$set:messages_string} 
         const result = await message_media_Model.updateOne({_id:messageid},element);
         return "message supprimer";
    }

   


    async  epingler_message(messageid){

        const objectid= new ObjectId(messageid)
        const messages_media= await message_media_Model.findOne({_id:objectid})
    
        const chat_objectid= new ObjectId(messages_media.chatid)
        console.log("id chat"+ chat_objectid )
        const chat = await chat_grouperModel.findOne({_id: chat_objectid})
        console.log("j'arrive ici"+ messages_string_and_media)
    if(chat.nb_message_epingler < 4 && messages_media.est_epingle===false ){
           messages_media.est_epingle= true;
           chat.nb_message_epingler= chat.nb_message_epingler +1;
           console.log("j'arrive ici")
    }
       
        const element= {$set:messages_string_and_media} 
        const chat_element= {$set:chat} 
            await chat_grouperModel.updateOne({_id:messages_media.chatid},chat_element)
         const result = await message_media_Model.updateOne({_id:messageid},element);
         
         return result;
      }

    signaler(){}

    async nombre_message_non_lue(chatid,user_id){
        const messages_string= await message_media_Model.find({chatid:chatid,lu_par:{$nin:[user_id]}})
          return messages_string.length;
        }


}

   module.exports = MessageMedia;