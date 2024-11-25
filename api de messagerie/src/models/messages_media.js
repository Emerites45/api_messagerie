const mongoose = require('mongoose');

const message_media_Schema = new mongoose.Schema({
  
    etat: { type: Boolean, default: false},
    chatid: String,
    media: Array,
    est_activer: { type: Boolean, default: true },
    id_expediteur: String      
},
{
    timestamps: true,
});

const  message_mediaModel= mongoose.model('message_media', message_media_Schema);

module.exports = message_mediaModel;