const express =require('express')
const app =require('express')()
const server = require('http').createServer(app)
const chatroute= require("./src/routes/chatroutes")
const  messagesroute =require("./src/routes/messagesroutes") 
const  utilisateurroute =require("./src/routes/utilisateurroutes") 

const io = require('socket.io')(server, {
  cors: {
      origin: "http://localhost:4200", // Remplacez par votre URL Angular
      methods: ["GET", "POST"]
  }
})
const connectDB = require('./src/db/db');

const cookiesParser = require('cookie-parser')

const bodyParser=require('body-parser')

require("dotenv").config();

const cors =require('cors')
const User = require('./src/models/Users');

const port =  process.env.PORT || 3000

//synchronisation a la base de donnee mongo
connectDB();
//session middleware
global.isConnected = false;
const corsOptions = {
  origin: 'http://localhost:4200', // Remplacez par votre/vos origine(s) autorisée(s)
    credentials: true, // Autoriser les cookies pour les requêtes authentifiées (si applicable)
    optionsSuccessStatus: 200, // Code de statut personnalisé pour les requêtes de pré-vol (optionnel)
  };


app.use(bodyParser.json())
  .use(bodyParser.urlencoded({extended:true}))
  app.use(cors({
    origin: 'http://localhost:4200'
}));
  
app.use(cookiesParser())
.use(express.static(__dirname))



app.use("/api/chat", chatroute);
app.use("/api/messages", messagesroute)
app.use("/api/utilisateur",utilisateurroute)

io.on('connection', (socket) => {
  console.log('A user connected');


  // Propriété pour stocker le groupe de l'utilisateur
  socket.currentGroup = null;

  socket.on('join_group', (groupId) => {
    // Définir le groupe actuel de l'utilisateur
    socket.currentGroup = groupId;
    socket.join(groupId);

    console.log("j'ai rejoind le chat id: "+groupId);
  });

  socket.on('message', (msg) => {
      console.log('Message received: ' + msg);
      if (socket.currentGroup) {
        io.to(socket.currentGroup).emit('message', msg);
      }
  });

  socket.on('disconnect', () => {
      console.log('User disconnected');
  });
});

/*
let utilisateur_connecter= [];

io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté');

  // Propriété pour stocker le groupe de l'utilisateur
  socket.currentGroup = null;

  socket.on('join group', (groupId) => {
    // Définir le groupe actuel de l'utilisateur
    socket.currentGroup = groupId;
    socket.join(groupId);
  });

  socket.on('chat message', (msg) => {
    if (socket.currentGroup) {
      io.to(socket.currentGroup).emit('chat message', msg);
    }
  });

  socket.on('disconnect', () => {
    console.log('Un utilisateur est déconnecté');
  });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
});
   
/*
io.on("ajout_nouveau_utilisateur",(socket)=>{
  console.log("nouvelle connection",socket.id);

  //liste des connections

  socket.on("ajout nouvelle utilisateur",(id_utilisateur)=>{
    
    !utilisateur_connecter.some((utilisateur)=> utilisateur.id_utilisateur === id_utilisateur)&&
    utilisateur.push({
      id_utilisateur,
      socketId: socket.id,
    });
    console.log("les utilisateurs sont ",utilisateur_connecter) 

    io.emit("get utilisateur online ",utilisateur_connecter)
  });

//envoie de message

socket.on("envoie de message",()=>{

  const utilisateur =utilisateur_connecter.find((utilisateur = utilisateur.id_utilisateur === message.id_destinataire));

  if(utilisateur){
    io.to(utilisateur.socketId).emit("get message",message)
  }

});
  
//deconnexion d'un utilisateur
  socket.on("deconnection",()=>{

    utilisateur_connecter= utilisateur_connecter.filter((utilisateur)=> utilisateur.socketId !==socket.id)
    io.emit("get utilisateur online ",utilisateur_connecter)

  })


})

io.on('connection',(socket)=>{
  console.log('connection effectuer')
  
    socket.on('message', (msg)=>{
         console.log("le message: "+msg)

         io.emit('message',msg);
})
})

  */

//ici, nous placerons nos futurs points de terminaison. 


//point de terminaison  front end 
/*
require("./src/routes/liste_image_complet")(app)                // http://localhost:3000/api/liste/imagecomplet
require("./src/routes/idadminstrateur")(app)                    // http://localhost:3000/api/administrateur
require("./src/routes/verification_connexion")(app)            //http://localhost:3000/api/verifier  permet de verifier si l'utilisateur est connecter ou pas 
require("./src/routes/liste_adresse_mail")(app)                //http://localhost:3000/api/liste/adresse_mail  pour avoir la liste des adresse mail 
require("./src/routes/liste_titre_formation")(app)              //http://localhost:3000/api/liste/titre_repertoire  pour avoir la liste des titres des formations 
require("./src/routes/envoie_demande_abonnement")(app)            
//require('./src/routes/envoismaildiffusion')(app)
*/
app.get('/', (req, res) => {

  res.sendFile(`${__dirname}/public/index.html`)
 })

//On ajoute la gestion des erreurs 404
app.use(({res})=>{
    const message ='Impossible de trouver la ressource demandée! vous pouvez essayer une autre URL.'
    res.status(404).json({message})
})

//server.listen(port,()=>console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))

server.listen(3000, () => {
  console.log('Listening on port 3000');
});