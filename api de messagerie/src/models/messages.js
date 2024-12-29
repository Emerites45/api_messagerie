const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  
    etat: String,
    chatid: String,
    contenu: String,
    senderid: String,
    
},
{
    timestamps: true,
});

const  messageModel= mongoose.model('message', messageSchema);

module.exports = messageModel