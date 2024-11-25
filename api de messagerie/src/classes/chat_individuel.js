const Chat = require("./chatClasse")
const chatModel= require("../models/chat")
const utilisateurModel= require("../models/Users")
let Chat_dto = require("../dto/Chat_Dto")



class Chat_Individuel extends Chat{
    constructor(valeur_favorite = false ,est_archive= false,est_activer= true,membres=[]){
      super(valeur_favorite,est_archive,est_activer,membres,"individuel")
   }

  async cree_chat(chat){
      let newchat = new chatModel(chat)
      const response =  await newchat.save()
      return response;
   }

 async liste_chat(userID){
      let liste_chats= []
      const chats = await chatModel.find({membres: {$in:[userID]}})
   
      for (const element of chats) {
          
          
          let utilisateur;
          if (element.membres[0] == userID) {
              utilisateur = await utilisateurModel.findOne({ id_utilisateur: element.membres[1] });
              console.log("jarrive ici" + element.membres[1]);

              console.log("identifiant  :" + element.id);
              console.log("valeur favorite :" + element.valeur_favorite);
              console.log("est archiver :" + element.est_archive);
              console.log("est activer :" + element.est_activer)
              console.log("pseudo :" + utilisateur.pseudo)
              const chat = new Chat_dto(element.id, element.valeur_favorite, element.est_archive,element.est_activer, utilisateur.pseudo);
  
              console.log("identifiant  :" + chat.id_chat);
              console.log("valeur favorite :" + chat.valeur_favorite);
              console.log("est archiver :" + chat.est_archive);
              console.log("pseudo :" + chat.nom);
  
              liste_chats.push(chat);
              console.log("on a :" + liste_chats.length);
          } else {
              utilisateur = await utilisateurModel.findOne({ id_utilisateur: element.membres[0] });
              const chat = new Chat_dto(element.membres[0], element.valeur_favorite, element.est_archive,element.est_activer,utilisateur.pseudo);
              liste_chats.push(chat);
          }
      }
      console.log("nombre chat"+liste_chats.length);

      return liste_chats;
   }

   async liste_chat_archive(userID){

      let liste_chats= []
      const chats = await chatModel.find({est_archive: true,membres: {$in:[userID]}})
   
      for (const element of chats) {
          
          
          let utilisateur;
          if (element.membres[0] == userID) {
              utilisateur = await utilisateurModel.findOne({ id_utilisateur: element.membres[1] });
              console.log("jarrive ici pour les archiver " + element.membres[1]);

              console.log("identifiant  :" + element.id);
              console.log("valeur favorite :" + element.valeur_favorite);
              console.log("est archiver :" + element.est_archive);
              console.log("est activer :" + element.est_activer)
              console.log("pseudo :" + utilisateur.pseudo)
              const chat = new Chat_dto(element.id, element.valeur_favorite, element.est_archive,element.est_activer, utilisateur.pseudo);
  
              console.log("identifiant  :" + chat.id_chat);
              console.log("valeur favorite :" + chat.valeur_favorite);
              console.log("est archiver :" + chat.est_archive);
              console.log("pseudo :" + chat.nom);
  
              liste_chats.push(chat);
              console.log("on a :" + liste_chats.length);
          } else {
              utilisateur = await utilisateurModel.findOne({ id_utilisateur: element.membres[0] });
              const chat = new Chat_dto(element.membres[0], element.valeur_favorite, element.est_archive,element.est_activer,utilisateur.pseudo);
              liste_chats.push(chat);
          }
      }
      console.log("nombre chat"+liste_chats.length);

      return liste_chats;
   }

  async  modifier_chat(chatID,chat){
   const element= {$set:chat} 

   const result = await chat_grouperModel.updateOne({_id:chatID},element);
   return result
    }

   
}

module.exports = Chat_Individuel;
