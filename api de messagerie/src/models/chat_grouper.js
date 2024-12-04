const mongoose = require('mongoose');

const chat_grouper_Schema = new mongoose.Schema({
  membres: Array,
  administrateur: Array,
  valeur_favorite: { type: Boolean, default: false },
  est_archive: { type: Boolean, default: false },
  nom:String,
  description: String,
  nb_message_epingler: Number,
  est_activer: { type: Boolean, default: false },
 
 
},
{
    timestamps: true,
});

const chat_grouper_Model= mongoose.model("chat_grouper",chat_grouper_Schema)

module.exports = chat_grouper_Model;