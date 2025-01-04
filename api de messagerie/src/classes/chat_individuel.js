const Chat = require("./chatClasse")
const chatModel= require("../models/chat")
const utilisateurModel= require("../models/Users")
let Chat_dto = require("../dto/chat_Dto")
const { ObjectId } = require('mongodb'); 



class Chat_Individuel extends Chat{
    constructor(valeur_favorite = [] ,est_archive_par= [],est_activer= true,membres=[]){
      super(valeur_favorite,est_archive_par,est_activer,membres,"individuel")
   }

  async cree_chat(chat){
      let newchat = new chatModel(chat)
      const response =  await newchat.save()
      return response;
   }


  async ajouter_chat_favoris(chatID, userid){
     
    const objectid= new ObjectId(chatID)
    let users =[]
      let  present = false
    const chat= await  chatModel.findOne({_id:objectid})
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
    const result = await chatModel.updateOne({_id:chatID},element);
    return result
 }
   

   async archiver_chat(chatID,userid){

    const objectid= new ObjectId(chatID)
    let users =[]
      let  present = false
    const chat= await  chatModel.findOne({_id:objectid})
    
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
    const result = await chatModel.updateOne({_id:chatID},element);
    return result
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
           
            console.log("est activer :" + element.est_activer)
            console.log("pseudo :" + utilisateur.pseudo)
            const chat = new Chat_dto(element.id,element.est_activer, utilisateur.pseudo,"individuel");

            console.log("identifiant  :" + chat.id_chat);
            console.log("valeur favorite :" + chat.valeur_favorite);
            console.log("est archiver :" + chat.est_archive);
            console.log("pseudo :" + chat.nom);

            liste_chats.push(chat);
            console.log("on a :" + liste_chats.length);
        } else {
            utilisateur = await utilisateurModel.findOne({ id_utilisateur: element.membres[0] });
            const chat = new Chat_dto(element.membres[0],element.est_activer,utilisateur.pseudo,"individuel");
            liste_chats.push(chat);
        }
    }
    console.log("nombre chat"+liste_chats.length);

    return liste_chats;
 }

 async liste_chat_archive(userID){

    let liste_chats= []
    const chats = await chatModel.find({est_archive_par: {$in:[userID]},membres: {$in:[userID]}})
 
    for (const element of chats) {
        
        
        let utilisateur;
        if (element.membres[0] == userID) {
            utilisateur = await utilisateurModel.findOne({ id_utilisateur: element.membres[1] });
            console.log("jarrive ici pour les archiver " + element.membres[1]);

            console.log("identifiant  :" + element.id);
            console.log("valeur favorite :" + element.valeur_favorite);
          
            console.log("est activer :" + element.est_activer)
            console.log("pseudo :" + utilisateur.pseudo)
            const chat = new Chat_dto(element.id,element.est_activer, utilisateur.pseudo,"individuel");

            console.log("identifiant  :" + chat.id_chat);
            console.log("valeur favorite :" + chat.valeur_favorite);
            console.log("est archiver :" + chat.est_archive);
            console.log("pseudo :" + chat.nom);

            liste_chats.push(chat);
            console.log("on a :" + liste_chats.length);
        } else {
            utilisateur = await utilisateurModel.findOne({ id_utilisateur: element.membres[0] });
            const chat = new Chat_dto(element.membres[0],element.est_activer,utilisateur.pseudo,"individuel");
            liste_chats.push(chat);
        }
    }
    console.log("nombre chat"+liste_chats.length);

    return liste_chats;
 }


 
 async liste_chat_favorite(userID){

    let liste_chats= []
    const chats = await chatModel.find({valeur_favorite: {$in:[userID]},membres: {$in:[userID]}})
 
    for (const element of chats) {
        
        
        let utilisateur;
        if (element.membres[0] == userID) {
            utilisateur = await utilisateurModel.findOne({ id_utilisateur: element.membres[1] });
            console.log("jarrive ici pour les archiver " + element.membres[1]);

            console.log("identifiant  :" + element.id);
            console.log("valeur favorite :" + element.valeur_favorite);
          
            console.log("est activer :" + element.est_activer)
            console.log("pseudo :" + utilisateur.pseudo)
            const chat = new Chat_dto(element.id,element.est_activer, utilisateur.pseudo,"individuel");

            console.log("identifiant  :" + chat.id_chat);
            console.log("valeur favorite :" + chat.valeur_favorite);
            console.log("est archiver :" + chat.est_archive);
            console.log("pseudo :" + chat.nom);

            liste_chats.push(chat);
            console.log("on a :" + liste_chats.length);
        } else {
            utilisateur = await utilisateurModel.findOne({ id_utilisateur: element.membres[0] });
            const chat = new Chat_dto(element.membres[0],element.est_activer,utilisateur.pseudo,"individuel");
            liste_chats.push(chat);
        }
    }
    console.log("nombre chat"+liste_chats.length);

    return liste_chats;
 }
  
   
}

module.exports = Chat_Individuel;
