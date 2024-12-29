const Message = require("../classes/messageClasse")
const messagemedia_and_string_Model = require("../models/messagesmedia_and_string")
let message_string_media_dto= require("../dto/message_string_and_media_Dto")
const { ObjectId } = require('mongodb'); 
const chat_grouperModel= require("../models/chat_grouper")
const message_media_Model= require ("../models/messages_media")


class  MessageStringAndMedia extends Message {

    constructor(chatid="",contenu="",media=[],lu_par=[],id_expediteur="",est_like=false,est_epingle=false,est_activer=true,supprimer_pour=[]){
        super(chatid,contenu,lu_par,id_expediteur,est_like,est_epingle,est_activer,supprimer_pour)
        this.media = media 
    }

  async  envoyer_message(messages){

    let lu = []
    lu.push(messages.id_expediteur)
    let message = {chatid: messages.chatid,contenu:messages.contenu,media: messages.media[0],lu_par:lu,id_expediteur:messages.id_expediteur,
        est_like:messages.estlike,
        est_epingle: messages.est_epingle,
        est_activer:messages.est_activer,
        supprimer_pour:messages.supprimer_pour
      } 
      let newmessage =  new messagemedia_and_string_Model(message)
        await newmessage.save()
      messages.media= messages.media.slice(1)
    for(const media of  messages.media){

        let message = {chatid: messages.chatid,media: media,etat:messages.etat,id_expediteur:messages.id_expediteur,
                       est_like:messages.estlike,
                       est_epingle: messages.est_epingle,
                       est_activer:messages.est_activer,
                       supprimer_pour:messages.supprimer_pour
                     } 
                     let newmessage_media =  new message_media_Model(message)
                     await newmessage_media.save()
                    }
      
        return "message enregistrée"
    }

  async   liste_messages(chatid,user_id){

    let liste_message_string_media= []
        const messages_string_and_media = await messagemedia_and_string_Model.find({chatid:chatid,lu_par:{$in:[user_id]}})

        for ( const message of messages_string_and_media ){
            const messages= new message_string_media_dto(message.id,message.chatid,message.contenu,message.media,message.est_activer,message.est_epingle,message.est_like,message.id_expediteur,"string_and_media",message.createdAt) 
              liste_message_string_media.push(messages);
              console.log( "le message sous forme dto : "+messages)
          }
        return liste_message_string_media;
    }

  async  liste_messages_non_lue(chatid,user_id){
    let lu = []
  
    console.log( "userid : "+user_id)
          let liste_message_string_media= []
          const messages_string_and_media = await messagemedia_and_string_Model.find({chatid:chatid,lu_par:{$nin:[user_id]}})
  
          for ( const message of messages_string_and_media ){
            lu = message.lu_par
            lu.push(user_id)
            const element= {$set:message} 
            await messagemedia_and_string_Model.updateOne({_id:message.id},element);

            
              const messages= new message_string_media_dto(message.id,message.chatid,message.contenu,message.media,message.est_activer,message.est_epingle,message.est_like,message.id_expediteur,"string_and_media",message.createdAt) 
                liste_message_string_media.push(messages);
                console.log( "le message sous forme dto : "+messages)
            }
          return liste_message_string_media;
    }
    

  async  modifier_message(messageid,contenu){

        const objectid= new ObjectId(messageid)
        const messages_string= await message_string_Model.find({_id:objectid})
        messages_string.contenu= contenu;
       
        const element= {$set:messages_string} 
         const result = await message_string_Model.updateOne({_id:messageid},element);
         return result;
      }

  async  supprimer_message(messageid){
        const objectid= new ObjectId(messageid)
        const messages_string= await  messagemedia_and_string_Model.find({_id:objectid})
        messages_string.est_activer= false;
       
        const element= {$set:messages_string} 
         const result = await  messagemedia_and_string_Model.updateOne({_id:messageid},element);
         return result;
          
      }

   async supprimer_message_pour(messageid,user_id){
        const objectid= new ObjectId(messageid)
        let users =[]
          let  present = false
        const messages_string= await messagemedia_and_string_Model.findOne({_id:objectid})
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
         const result = await messagemedia_and_string_Model.updateOne({_id:messageid},element);
         return "message supprimer";
    }


    async  epingler_message(messageid){

        const objectid= new ObjectId(messageid)
        const messages_string_and_media= await messagemedia_and_string_Model.findOne({_id:objectid})
    
        const chat_objectid= new ObjectId(messages_string_and_media.chatid)
        console.log("id chat"+ chat_objectid )
        const chat = await chat_grouperModel.findOne({_id: chat_objectid})
        console.log("j'arrive ici"+ messages_string_and_media)
    if(chat.nb_message_epingler < 4 && messages_string_and_media.est_epingle===false ){
           messages_string_and_media.est_epingle= true;
           chat.nb_message_epingler= chat.nb_message_epingler +1;
           console.log("j'arrive ici")
    }
       
        const element= {$set:messages_string_and_media} 
        const chat_element= {$set:chat} 
            await chat_grouperModel.updateOne({_id:messages_string_and_media.chatid},chat_element)
         const result = await messagemedia_and_string_Model.updateOne({_id:messageid},element);
         
         return result;
      }


    signaler(){}

    async nombre_message_non_lue(chatid,user_id){
        const messages_string= await messagemedia_and_string_Model.find({chatid:chatid,lu_par:{$nin:[user_id]}})
          return messages_string.length;
        }




}

   module.exports = MessageStringAndMedia;