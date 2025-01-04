const mongoose = require('mongoose');

const message_media_and_string_Schema = new mongoose.Schema({
  
   
    chatid: String,
    media: String,
    contenu: String, 
    id_expediteur: String,  
    est_activer: { type: Boolean, default: true },
    est_epingle: { type: Boolean, default: false },
    supprimer_pour:Array,
    lu_par:Array, 


},
{
    timestamps: true,
});

const  messagemedia_and_string_Model= mongoose.model('message_media_and_string', message_media_and_string_Schema);

module.exports = messagemedia_and_string_Model