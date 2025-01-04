const mongoose = require('mongoose');

const message_string_Schema = new mongoose.Schema({
  
    
    chatid: String,
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

const  message_string_Model= mongoose.model('message_string', message_string_Schema);

module.exports = message_string_Model;