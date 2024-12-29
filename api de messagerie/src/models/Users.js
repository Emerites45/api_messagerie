const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id_utilisateur: String,
  pseudo: String,
  adresse_mail: String, 
});

module.exports = mongoose.model('Utilisateur', userSchema);