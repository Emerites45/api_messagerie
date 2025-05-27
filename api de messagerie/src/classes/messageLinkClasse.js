const Message = require("./messageClasse")
const  link_Model = require ("../models/messages_link")
const { ObjectId } = require('mongodb'); 
const link_dto = require("../dto/message_link_Dto")


class  MessageLink extends Message {

    constructor(chatid="",contenu="",lu_par=[],id_expediteur="",est_epingle=false,supprimer_pour=[]){
        super(chatid,contenu,lu_par,id_expediteur,est_epingle,supprimer_pour)
    }

   async  envoyer_message(messages){
    let lu = []
    lu.push(messages.id_expediteur)
    let message = {
        chatid: messages.chatid,
        contenu:messages.contenu,
        id_expediteur:messages.id_expediteur,
        est_epingle: messages.est_epingle,
        supprimer_pour:messages.supprimer_pour
    } 
        let newmessage =  new link_Model(message)
      const  response =  await newmessage.save()
        return response
    }

  async  liste_messages(chatid,user_id){

    let liste_link=[];
       const messages_string= await link_Model.find({chatid:chatid,lu_par:{$in:[user_id]}})
      for ( const message of messages_string){
        const messages= new link_dto(message.id,message.chatid,message.contenu,message.est_epingle,message.est_like,message.id_expediteur,"string",message.createdAt) 
          liste_link.push(messages);
      }
        return liste_link;
    }

    async  liste_message_by_id(message_id){
       const objectid= new ObjectId(message_id)
       const messages_string= await link_Model.find({_id:objectid})
        return messages_string;
    }
 async   liste_messages_non_lue(chatid,user_id){
   let lu = []
  
  let liste_link=[];
  const messages_link= await link_Model.find({chatid:chatid,lu_par:{$nin:[user_id]}})

  console.log("le nombre de message link non lu:"+messages_link.length)
 for ( const message of messages_link){
  lu = message.lu_par
  lu.push(user_id)
  const element= {$set:message} 
  await link_Model.updateOne({_id:message.id},element);
   const messages= new link_dto(message.id,message.chatid,message.contenu,message.est_epingle,message.est_like,message.id_expediteur,"link",message.createdAt) 
     liste_link.push(messages);
    
 }
   return liste_link;
    }

  async  modifier_etat_message(messageId){
    const objectid= new ObjectId(messageid)
    const messages_string= await link_Model.find({_id:objectid})

     const element= {$set:message} 
     const result = await link_Model.updateOne({_id:messageId},element);
     return result


  }

  async  modifier_message(messageid,contenu){

    const objectid= new ObjectId(messageid)
    const messages_string= await link_Model.findOne({_id:objectid})
    messages_string.contenu= contenu;
   
    const element= {$set:messages_string} 
     const result = await link_Model.updateOne({_id:messageid},element);
     return result;
  }

  async  epingler_message(messageid){
    let result=""
    const objectid= new ObjectId(messageid)
    const messages_string= await link_Model.find({_id:objectid})

    const chat_objectid= new ObjectId(messages_string.chatid)
    const chat = await chat_grouperModel({_id: chat_objectid})
if(chat.nb_message_epingler < 4 ){
       messages_string.est_epingle= true;
       chat.nb_message_epingler= chat.nb_message_epingler +1;
       result = "message epingler "
}
else{
  result= "je ne peux plus epingler"
}
   
    const element= {$set:messages_string} 
    const chat_element= {$set:chat} 
        await chat_grouperModel.updateOne({_id:messages_string.chatid},chat_element)
        await link_Model.updateOne({_id:messageid},element);
     
     return result;
  }


  async  supprimer_message(messageid){
    const objectid= new ObjectId(messageid)
    const messages_string= await link_Model.find({_id:objectid})
   
    const element= {$set:messages_string} 
     const result = await link_Model.updateOne({_id:messageid},element);
     return result;
      
  }

  
  async  supprimer_message_pour(messageid,user_id){
    const objectid= new ObjectId(messageid)
    const messages_string= await link_Model.find({_id:objectid})
    messages_string.supprimer_pour.push(user_id)
   
    const element= {$set:messages_string} 
     const result = await link_Model.updateOne({_id:messageid},element);
     return result;
      
  }

   async nombre_message_non_lue(chatid,user_id){
    const messages_string= await link_Model.find({chatid:chatid,lu_par:{$nin:[user_id]}})
      return messages_string.length;
    }

            
 async  supprimer_message(id_message){
  const objectid= new ObjectId(id_message);
   let response=""
  const  message = await link_Model.findByIdAndDelete(objectid);

 if(message){
      response= "message supprimer avec succes "
 }
 else{
  response="message inexistant"
 }
 return response;   
}



}

   module.exports = MessageLink;