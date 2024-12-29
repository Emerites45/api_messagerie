const chatModel= require("../models/chat")
const Chat_Individuel= require("../classes/chat_individuel")
const Chat_Grouper= require("../classes/chat_grouper")


function chatFactory(valeur_favorite,est_archive,est_activer,membres,type,nom,description,administrateurs,nb_message_epingler) {
    switch (type) {
        case 'individuel':
            return new Chat_Individuel(valeur_favorite,est_archive,est_activer,membres,"individuel");
        case 'groupe':
            return new Chat_Grouper(valeur_favorite,est_archive,est_activer,membres,nom,description,administrateurs,nb_message_epingler);
        
        default:
            throw new Error('type de groupe non reconnue');
    }
}



//creation chat
const createchat = async(req,res)  => {

    let premierID = req.body.membres[0]
    let secondID =req.body.membres[1]
    try{
  //verifier si le chat n'existe pas deja 

    let response="";
        let chat = await chatModel.findOne({
            membres: {$all: [premierID,secondID]}
        })

        if(chat) return res.status(200).json(chat);

   // creation du chat 

        chat = chatFactory([],[],true,req.body.membres,req.body.type,req.body.nom,req.body.description,req.body.administrateur,0);

         response= await  chat.cree_chat(chat);
    
        res.status(200).json(response);

    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
} ;


//rechercher les  chats d'un utilisateur


const finduserchats =  async(req,res)  => {

  
    const userID = req.params.userID

    try
    {    
 
      
       console.log("j'arrive ici ") 
   
    const chat_individuel = new Chat_Individuel
       const chat_grouper = new Chat_Grouper 
       const liste_chat_individuel= await chat_individuel.liste_chat(userID);
      const liste_chat_grouper= await chat_grouper.liste_chat(userID) 
      const liste_chat_archiver_individuel=  await chat_individuel.liste_chat_archive(userID) 
      const liste_chat_archiver_grouper=    await chat_grouper.liste_chat_archive(userID) 

         

    const response={liste_chat_individuel,liste_chat_grouper,liste_chat_archiver_individuel,liste_chat_archiver_grouper}
        res.status(200).json(response);
    }
    catch(error){
        console.log(error)
        res.status(500).json(error)
    }
};


//modifier un chat 

const updatechat =  async(req,res)  => {
    const {chatID} = req.params
    let response
    try{
        chat = chatFactory(req.body.valeur_favorite,req.body.est_archive,req.body.est_activer,req.body.membres,req.body.type,req.body.nom,req.body.description,req.body.administrateur,req.body.nb_message_epingler);
       
        console.log("le chat id: "+chatID)
        if( req.body.type=="individuel"){
           
            response= await chat.modifier_chat(chatID,chat);
             }
 
           if( req.body.type=="groupe"){  
            response= await  chat.modifier_chat(chatID,chat);
          
         }
         res.status(200).json(response);

    }
    catch(error){
        console.log(error)
        res.status(500).json(error)
      }
}


//archiver le chat 


const archiver_chat =  async(req,res)  => {
    const chatID = req.params.chatID
    const userID= req.params.userID
    const type = req.params.type

    chat = chatFactory([],[],true,[],type,"","",[],0);

    response= await chat.archiver_chat(chatID,userID) 
    res.status(200).json(response);

}


//ajouter un chat parmis les favoris d'un utilisateur

const add_favorite = async(req,res)  => {
  
  
  try{ 
    const chatID = req.params.chatID
    const userID= req.params.userID
    const type = req.params.type

    chat = chatFactory([],[],true,[],type,"","",[],0);

    response= await chat.ajouter_chat_favoris(chatID,userID) 
    res.status(200).json(response);
}
catch(error){
    console.log(error)
    res.status(500).json(error)
}
       
}

// rechercher un chat 


const findchats =  async(req,res)  => {

       
    const {premierID, secondID} = req.params;

    console.log("nous sommes"+premierID);
    console.log("nous sommes"+secondID);

    try
    {
        const chat = await chatModel.find({
            membres: {$all: [premierID,secondID]}})

        res.status(200).json(chat)

    }
    catch(error){
      console.log(error)
      res.status(500).json(error)
    }
};

module.exports= {createchat,finduserchats,findchats,updatechat,add_favorite,archiver_chat}
