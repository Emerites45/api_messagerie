const mongoose = require('mongoose');

const chat_grouper_Schema = new mongoose.Schema({
  membres: Array,
  administrateur: Array,
  nom:String,
  description: String,
  nb_message_epingler: Number,
  est_activer: { type: Boolean, default: false },
  valeur_favorite: Array,
  est_archive_par:Array ,
 
 
},
{
    timestamps: true,
});

const chat_grouper_Model= mongoose.model("chat_grouper",chat_grouper_Schema)

module.exports = chat_grouper_Model;