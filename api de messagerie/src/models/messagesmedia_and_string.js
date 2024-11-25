const mongoose = require('mongoose');

const message_media_and_string_Schema = new mongoose.Schema({
  
    etat: { type: Boolean, default: false},
    chatid: String,
    media: Array,
    contenu: String, 
    id_expediteur: String,  
    est_activer: { type: Boolean, default: true },

},
{
    timestamps: true,
});

const  messagemedia_and_string_Model= mongoose.model('message_media_and_string', message_media_and_string_Schema);

module.exports = messagemedia_and_string_Model