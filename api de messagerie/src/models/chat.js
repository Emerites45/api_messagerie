const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  membres: Array,
  valeur_favorite: Array,
  est_archive_par:Array ,
  est_activer: { type: Boolean, default: false },
},
{
    timestamps: true,
});

const chatModel= mongoose.model("chat",chatSchema)

module.exports = chatModel;