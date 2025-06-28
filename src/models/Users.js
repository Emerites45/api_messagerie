const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id_utilisateur:{ 
   type: String,
   required: true},
  pseudo:{
    type: String,
    required: true},
  adresse_mail: {
    type: String, 
    unique: true,    
    match: /.+\@.+\..+/ 
}
});

module.exports = mongoose.model('Utilisateur', userSchema);