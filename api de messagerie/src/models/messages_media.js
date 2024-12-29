const mongoose = require('mongoose');

const message_media_Schema = new mongoose.Schema({
  
    
    chatid: String,
    media: String,
    est_activer: { type: Boolean, default: true },
    est_epingle: { type: Boolean, default: false },
    id_expediteur: String,  
    lu_par:Array, 
    supprimer_pour:Array,
},
{
    timestamps: true,
});

const  message_mediaModel= mongoose.model('message_media', message_media_Schema);

module.exports = message_mediaModel;