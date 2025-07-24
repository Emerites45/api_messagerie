const mongoose = require('mongoose');

const chat_grouper_Schema = new mongoose.Schema({
  membres:{
    type:  Array,
    required: true
  },
  administrateur:{
    type:  Array,
    required: true
  },
  nom: {
   type: String,
   unique: true,   
   required:true,
  },
  description: {
    type:String,
    required:true},
  nb_message_epingler: {
    type: Number,
    required: true,
  },
  valeur_favorite:{
    type:  Array,
    required: true
  },
  est_archive_par:{
    type:  Array,
    required: true
  } ,
  supprimer_pour:
    { type: Array,
       required: true
    },
    associer_au_dossier: {
      type: String,
      required:false,
     },
     
photo_profil: {
  type: String,
} 
},
{
    timestamps: true,
});

const chat_grouper_Model= mongoose.model("chat_grouper",chat_grouper_Schema)

module.exports = chat_grouper_Model;