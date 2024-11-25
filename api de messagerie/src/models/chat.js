const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  membres: Array,
  valeur_favorite: { type: Boolean, default: false },
  est_archive: { type: Boolean, default: false },
  est_activer: { type: Boolean, default: false },
 

},
{
    timestamps: true,
});

const chatModel= mongoose.model("chat",chatSchema)

module.exports = chatModel;