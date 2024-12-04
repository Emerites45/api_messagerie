
const Chat = require("./chatClasse")
const utilisateurModel= require("../models/Users")
const chat_grouperModel= require("../models/chat_grouper")
let Chat_grouperdto = require("../dto/chat_grouper_Dto")

class Chat_Grouper extends Chat{

    constructor(valeur_favorite = false,est_archive= false,est_activer= true,membres=[],nom="",description="",administrateur=[],nb_message_epingler){
      super(valeur_favorite,est_archive,est_activer,membres,"groupe")
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

   async liste_chat(userID){
      let liste_chats= []
      const chats = await chat_grouperModel.find({membres: {$in:[userID]}})
      console.log("on a chat grropuer :" + liste_chats.length);
   
      for (const element of chats) {
              const chat = new Chat_grouperdto(element.id, element.valeur_favorite, element.est_archive,element.est_activer,element.membres,element.nom,element.description,element.administrateur,element.nb_message_epingler,element.createAt);
              liste_chats.push(chat);
              console.log("on a chat grropuer :" + liste_chats.length);
          } 
      

      return liste_chats;
   }

   async liste_chat_archive(userID){
      let liste_chats= []
      const chats = await chat_grouperModel.find({ est_archive: true,membres: {$in:[userID]}})
      console.log("on a chat grouper :" + liste_chats.length);
   
      for (const element of chats) {
              const chat = new Chat_grouperdto(element.id, element.valeur_favorite, element.est_archive,element.est_activer,element.membres,element.nom,element.description,element.administrateur,element.createAt);
              liste_chats.push(chat);
              console.log("on a chat grouper :" + liste_chats.length);
          } 
      

      return liste_chats;
   }


   async modifier_chat(chatID,chat){

      const element= {$set:chat} 
      console.log("le chat id: "+chatID)
      const result = await chat_grouperModel.updateOne({_id:chatID},element);
      return result
   }
   
}

module.exports = Chat_Grouper;
