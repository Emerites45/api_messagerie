const express =require('express')
const app =require('express')()
const server = require('http').createServer(app)
const chatroute= require("./src/routes/chatroutes")
const  dossierroute= require("./src/routes/dossierroutes")
const  messagesroute =require("./src/routes/messagesroutes") 
const  utilisateurroute =require("./src/routes/utilisateurroutes") 
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const eurekaClient = require('./src/config/eureka'); 


const  message_string_Model = require ("./src/classes/messageStringClasse")
const { ObjectId } = require('mongodb'); 

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0', // Version d'OpenAPI
    info: {
      title: 'Mon API',
      version: '1.0.0',
      description: 'Documentation de mon API',
    },
    servers: [
      {
        url: 'http://localhost:3000', // URL de votre API
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Chemin vers les fichiers contenant les commentaires Swagger
};

// Initialisation de swaggerJSDoc
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Middleware pour servir la documentation Swagger
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


const io = require('socket.io')(server, {
  cors: {
      origin: "*",//"http://localhost:4200", // Remplacez par votre URL Angular
      methods: ["GET", "POST"]
  }
})
//const connectDB = require('./src/db/db');

const cookiesParser = require('cookie-parser')

const bodyParser=require('body-parser')

require("dotenv").config();

const cors =require('cors')
const User = require('./src/models/Users');

const port =  process.env.PORT || 3000

//synchronisation a la base de donnee mongo
//connectDB();
//session middleware
global.isConnected = false;
/*const corsOptions = {
  origin: 'http://localhost:4200', // Remplacez par votre/vos origine(s) autorisée(s)
    credentials: true, // Autoriser les cookies pour les requêtes authentifiées (si applicable)
    optionsSuccessStatus: 200, // Code de statut personnalisé pour les requêtes de pré-vol (optionnel)
  };
*/

app.use(bodyParser.json())
  .use(bodyParser.urlencoded({extended:true}))
  app.use(cors({
    origin: 'http://localhost:4200'
}));
  
app.use(cookiesParser())
.use(express.static(__dirname))



app.use("/api/chat", chatroute);
app.use("/api/dossier",dossierroute)
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

  socket.on('send_message', (msg) => {
      console.log('Message received: ' + msg);
      if (socket.currentGroup) {
        io.to(socket.currentGroup).emit('message', msg);
      }
  });

  socket.on('read_message', async (message_id,id_utilisateur) => {

    let lu=[];
    console.log('Message received: ' + message_id + " et :"+ id_utilisateur);

    const objectid= new ObjectId(messageid)
    const message= await message_string_Model.find({_id:objectid})

    lu = message.lu_par
    lu.pus(user_id)
    const element= {$set:message} 
    await message_string_Model.updateOne({_id:message.id},element);
    
});

  socket.on('disconnect', () => {
      console.log('User disconnected');
  });
});
const path = require('path');
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//On ajoute la gestion des erreurs 404
app.use(({res})=>{
    const message ='Impossible de trouver la ressource demandée! vous pouvez essayer une autre URL.'
    res.status(404).json({message})
})

//server.listen(port,()=>console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))

server.listen(3000, () => {
  console.log('Listening on port 3000');
});

