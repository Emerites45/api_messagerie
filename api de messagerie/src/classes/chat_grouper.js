
const Chat = require("./chatClasse")
const utilisateurModel= require("../models/Users")
const chat_grouperModel= require("../models/chat_grouper")
let Chat_grouperdto = require("../dto/chat_grouper_Dto")
const { ObjectId } = require('mongodb'); 

class Chat_Grouper extends Chat{

    constructor(
      valeur_favorite = [],
      est_archive_par= [],
      est_activer= true,
      membres=[],
      nom="",
      description="",
      administrateur=[],
      nb_message_epingler){
      super(valeur_favorite,est_archive_par,est_activer,membres,"groupe")
      this.description=description
      this.administrateur= administrateur
      this.nom= nom
      this.nb_message_epingler = nb_message_epingler
   }


   async cree_chat(chat){
      let newchat = new chat_grouperModel(chat)
      const response = await  newchat.save()
      return response;
   }
   async modifier_chat(chatID,chat){

      const element= {$set:chat} 
      console.log("le chat id: "+chatID)
      const result = await chat_grouperModel.updateOne({_id:chatID},element);
      return result
   }


   
  async ajouter_chat_favoris(chatID, userid){
     
   const objectid= new ObjectId(chatID)
   let users =[]
     let  present = false
   const chat= await  chat_grouperModel.findOne({_id:objectid})
   console.log("liste des utilisateur dans favorite : "+ chat. valeur_favorite);
   users =  chat.valeur_favorite;
     

     for (const user of users ){
         if(user === userid)
         present =true;
     }
     if(present === false){
     users.push(userid)
     }
 chat.valeur_favorite = users
  const element= {$set:chat} 
   console.log("le chat id: "+chatID)
   const result = await chat_grouperModel.updateOne({_id:chatID},element);
   return result
}

   
   async archiver_chat(chatID,userid){


      const objectid= new ObjectId(chatID)
      let users =[]
        let  present = false
      const chat= await  chat_grouperModel.findOne({_id:objectid})
      
      users =  chat.est_archive_par
        for (const user of users ){
            if(user === userid)
            present =true;
        }
        if(present === false){
        users.push(userid)
        }
    chat.est_archive_par = users
     const element= {$set:chat} 
      console.log("le chat id: "+chatID)
      const result = await chat_grouperModel.updateOne({_id:chatID},element);
      return result
   }

   
   async liste_chat(userID){
      let liste_chats= []
      const chats = await chat_grouperModel.find({membres: {$in:[userID]}})
      console.log("on a chat grropuer :" + liste_chats.length);
   
      for (const element of chats) {
              const chat = new Chat_grouperdto(
               element.id,
               element.est_activer,
               element.membres,
               element.nom,
               element.description,
               element.administrateur,
               element.nb_message_epingler,
               element.createAt,
               "groupe");
              liste_chats.push(chat);
              console.log("on a chat gropuer :" + liste_chats.length);
          } 
      return liste_chats;
   }

   async liste_chat_archive(userID){
      let liste_chats= []
      const chats = await chat_grouperModel.find({est_archive_par: {$in:[userID]},membres: {$in:[userID]}})
      console.log("on a chat grouper :" + liste_chats.length);
   
      for (const element of chats) {
              const chat = new Chat_grouperdto(
               element.id,
               element.est_activer,
               element.membres,
               element.nom,
               element.description,
               element.administrateur,
               element.createAt,
               "groupe");
              liste_chats.push(chat);
              console.log("on a chat grouper :" + liste_chats.length);
          } 
      return liste_chats;
   }

   async liste_chat_favorite(userID){
      let liste_chats= []
      const chats = await chat_grouperModel.find({valeur_favorite: {$in:[userID]},membres: {$in:[userID]}})
      console.log("on a chat grouper :" + liste_chats.length);
   
      for (const element of chats) {
              const chat = new Chat_grouperdto(
               element.id,
               element.est_activer,
               element.membres,
               element.nom,
               element.description,
               element.administrateur,
               element.createAt,
               "groupe");
              liste_chats.push(chat);
              console.log("on a chat grouper :" + liste_chats.length);
          } 
      return liste_chats;
   }
   
}

module.exports = Chat_Grouper;
