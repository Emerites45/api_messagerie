const mongoose = require('mongoose');

const dossierSchema = new mongoose.Schema({
 
  nom: {
   type: String,
   unique: true,   
   required:true,
  },
  description: {
    type:String,
    required:false},
  user_id:{ type: String,
      required: [true,'l identifiant du chat  est requis ']
  },
 
},
{
    timestamps: true,
});
const dossierModel= mongoose.model("dossier",dossierSchema)

module.exports = dossierModel;