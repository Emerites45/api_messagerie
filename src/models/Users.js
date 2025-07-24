const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id:{ 
   type: String,
   required: true},
  pseudo:{
    type: String,
    required: true},
  role:{
      type: String,
      required: true},
  adresse_mail: {
    type: String, 
    unique: true,    
    match: /.+\@.+\..+/ 
},
photo_profil: {
  type: String,
}
});

module.exports = mongoose.model('Utilisateur', userSchema);