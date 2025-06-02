const Chat = require("./chatClasse")
const chatModel= require("../models/chat")
const utilisateurModel= require("../models/Users")
let Chat_dto = require("../dto/chat_Dto")
const { ObjectId } = require('mongodb'); 



class Chat_Individuel extends Chat{
    constructor(valeur_favorite = [] ,est_archive_par= [],membres=[]){
      super(valeur_favorite,est_archive_par,membres,[],"")
   }

  async cree_chat(chat){
      let newchat = new chatModel(chat)
      const response =  await newchat.save()
      return response;
   }

   async  ajouter_au_dossier(id_dossier,chatID){
    const objectid= new ObjectId(chatID)
    
    const chat= await  chatModel.findOne({_id:objectid})
    chat.associer_au_dossier= id_dossier;
   
    const element= {$set:chat} 
    console.log("le chat id: "+chatID)
    const result = await chatModel.updateOne({_id:chatID},element);
    return result

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
    const chats = await chatModel.find({membres: {$in:[userID]},est_archive_par: {$nin:[userID]}})
 
    for (const element of chats) {
        
        
        let utilisateur;
        if (element.membres[0] == userID) {
            utilisateur = await utilisateurModel.findOne({ id_utilisateur: element.membres[1] });
            console.log("jarrive ici" + element.membres[1]);

            console.log("identifiant  :" + element.id);
            console.log("date dans chat individuelle   :" + element.createdAt);
            console.log("valeur favorite :" + element.valeur_favorite);
           
            console.log("pseudo :" + utilisateur.pseudo)
            const chat = new Chat_dto(element.id, utilisateur.pseudo,"individuel",element.createdAt);

            console.log("identifiant  :" + chat.id_chat);
            console.log("valeur favorite :" + chat.valeur_favorite);
            console.log("est archiver :" + chat.est_archive);
            console.log("pseudo :" + chat.nom);

            liste_chats.push(chat);
            console.log("on a :" + liste_chats.length);
        } else {
            utilisateur = await utilisateurModel.findOne({ id_utilisateur: element.membres[0] });
            const chat = new Chat_dto(element.id,utilisateur.pseudo,"individuel",element.createdAt);
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
          
           
            console.log("pseudo :" + utilisateur.pseudo)
            const chat = new Chat_dto(element.id, utilisateur.pseudo,"individuel",element.createdAt);

            console.log("identifiant  :" + chat.id_chat);
            console.log("valeur favorite :" + chat.valeur_favorite);
            console.log("est archiver :" + chat.est_archive);
            console.log("pseudo :" + chat.nom);

            liste_chats.push(chat);
            console.log("on a :" + liste_chats.length);
        } else {
            utilisateur = await utilisateurModel.findOne({ id_utilisateur: element.membres[0] });
            const chat = new Chat_dto(element.membres[0],utilisateur.pseudo,"individuel",element.createdAt);
            liste_chats.push(chat);
        }
    }
    console.log("nombre chat"+liste_chats.length);

    return liste_chats;
 }


 
 async liste_chat_favorite(userID){

    let liste_chats= []
    const chats = await chatModel.find({valeur_favorite: {$in:[userID]},membres: {$in:[userID]},est_archive_par: {$nin:[userID]}})
 
    for (const element of chats) {
        
        
        let utilisateur;
        if (element.membres[0] == userID) {
            utilisateur = await utilisateurModel.findOne({ id_utilisateur: element.membres[1] });
            console.log("jarrive ici pour les archiver " + element.membres[1]);

            console.log("identifiant  :" + element.id);
            console.log("valeur favorite :" + element.valeur_favorite);
                      console.log("pseudo :" + utilisateur.pseudo)
            const chat = new Chat_dto(element.id, utilisateur.pseudo,"individuel",element.createdAt);

            console.log("identifiant  :" + chat.id_chat);
            console.log("valeur favorite :" + chat.valeur_favorite);
            console.log("est archiver :" + chat.est_archive);
            console.log("pseudo :" + chat.nom);

            liste_chats.push(chat);
            console.log("on a :" + liste_chats.length);
        } else {
            utilisateur = await utilisateurModel.findOne({ id_utilisateur: element.membres[0] });
            const chat = new Chat_dto(element.membres[0],utilisateur.pseudo,"individuel",element.createdAt);
            liste_chats.push(chat);
        }
    }
    console.log("nombre chat"+liste_chats.length);

    return liste_chats;
 }
  
   
 async  supprimer_chat(chatID){
    const objectid= new ObjectId(chatID);
     let response=""
    const chat = await chatModel.findByIdAndDelete(objectid);

   if(chat){
        response= "chat supprimer avec succes "
   }
   else{
    response="chat inexistant"
   }
   return response;   
  }

 async ajouter_un_chat_au_dossier(id_dossier,id_chat){
    let chats
    const objectid= new ObjectId(id_chat)
    chats = await chatModel.findOne({_id:objectid})

     chats.associer_au_dossier= id_dossier 
     const element= {$set:chats} 
  
     const result = await chatModel.updateOne({_id:id_chat},element);
     return result;
}
 
   
}

module.exports = Chat_Individuel;
