const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  membres: {
  type:  Array,
  required: [true,'la liste des membres est requis ']
},
  valeur_favorite: {
    type:  Array,
    required:[true,'la liste des favorie est requis ']
  },
  est_archive_par:{
    type:  Array,
    required:[true,'la liste des chat  archiver  est requis ']
  },
  est_activer: { type: Boolean, default: false
   },
},
{
    timestamps: true,
});

const chatModel= mongoose.model("chat",chatSchema)

module.exports = chatModel;