const Message = require("./messageClasse")
const  message_string_Model = require ("../models/messages_string")
const { ObjectId } = require('mongodb'); 
const message_string_dto = require("../dto/message_string_Dto")
const chat_grouperModel= require("../models/chat_grouper")


class  MessageString extends Message {

    constructor(chatid="",contenu="",lu_par=[],id_expediteur="",est_like=false,est_epingle=false,est_activer=true,supprimer_pour=[]){
        super(chatid,contenu,lu_par,id_expediteur,est_like,est_epingle,est_activer,supprimer_pour)
    }

   async  envoyer_message(messages){
    let lu = []
    lu.push(messages.id_expediteur)
    let message = {chatid: messages.chatid,contenu:messages.contenu,lu_par:lu,id_expediteur:messages.id_expediteur,
      est_like:messages.estlike,
      est_epingle: messages.est_epingle,
      est_activer:messages.est_activer,
      supprimer_pour:messages.supprimer_pour
    } 
        let newmessage =  new message_string_Model(message)
      const  response =  await newmessage.save()
        return response
    }

  async  liste_messages(chatid,user_id){

    let liste_message_string=[];
       const messages_string= await message_string_Model.find({chatid:chatid,lu_par:{$in:[user_id]}})
      for ( const message of messages_string){
        const messages= new message_string_dto(message.id,message.chatid,message.contenu,message.est_activer,message.est_epingle,message.est_like,message.id_expediteur,"string",message.createdAt) 
          liste_message_string.push(messages);
          console.log( "le message string sous forme dto : "+message.est_activer)
      }
        return liste_message_string;
    }

    async  liste_message_by_id(message_id){
       const objectid= new ObjectId(message_id)
       const messages_string= await message_string_Model.find({_id:objectid})
        return messages_string;
    }
 async   liste_messages_non_lue(chatid,user_id){
   let lu = []
  
  let liste_message_string=[];
  const messages_string= await message_string_Model.find({chatid:chatid,lu_par:{$nin:[user_id]}})

 for ( const message of messages_string){
  lu = message.lu_par
  lu.push(user_id)
  const element= {$set:message} 
  await message_string_Model.updateOne({_id:message.id},element);
   const messages= new message_string_dto(message.id,message.chatid,message.contenu,message.est_activer,message.est_epingle,message.est_like,message.id_expediteur,"string",message.createdAt) 
     liste_message_string.push(messages);
     console.log( "le message string sous forme dto : "+message.est_activer)
 }
   return liste_message_string;
    }

  async  modifier_etat_message(messageId){
    const objectid= new ObjectId(messageid)
    const messages_string= await message_string_Model.find({_id:objectid})

     const element= {$set:message} 
     const result = await message_string_Model.updateOne({_id:messageId},element);
     return result


  }

  async  modifier_message(messageid,contenu){

    const objectid= new ObjectId(messageid)
    const messages_string= await message_string_Model.findOne({_id:objectid})
    messages_string.contenu= contenu;
   
    const element= {$set:messages_string} 
     const result = await message_string_Model.updateOne({_id:messageid},element);
     return result;
  }

  async  epingler_message(messageid){

    const objectid= new ObjectId(messageid)
    const messages_string= await message_string_Model.find({_id:objectid})

    const chat_objectid= new ObjectId(messages_string.chatid)
    const chat = await chat_grouperModel({_id: chat_objectid})
if(chat.nb_message_epingler < 4 ){
       messages_string.est_activer= false;
       chat.nb_message_epingler= chat.nb_message_epingler +1;
}
   
    const element= {$set:messages_string} 
    const chat_element= {$set:chat} 
        await chat_grouperModel.updateOne({_id:messages_string.chatid},chat_element)
     const result = await message_string_Model.updateOne({_id:messageid},element);
     
     return result;
  }


  async  supprimer_message(messageid){
    const objectid= new ObjectId(messageid)
    const messages_string= await message_string_Model.find({_id:objectid})
    messages_string.est_activer= false;
   
    const element= {$set:messages_string} 
     const result = await message_string_Model.updateOne({_id:messageid},element);
     return result;
      
  }

  
  async  supprimer_message_pour(messageid,user_id){
    const objectid= new ObjectId(messageid)
    const messages_string= await message_string_Model.find({_id:objectid})
    messages_string.supprimer_pour.push(user_id)
   
    const element= {$set:messages_string} 
     const result = await message_string_Model.updateOne({_id:messageid},element);
     return result;
      
  }

   async nombre_message_non_lue(chatid,user_id){
    const messages_string= await message_string_Model.find({chatid:chatid,lu_par:{$nin:[user_id]}})
      return messages_string.length;
    }




}

   module.exports = MessageString;