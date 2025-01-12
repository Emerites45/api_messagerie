const mongoose = require('mongoose');

const message_string_Schema = new mongoose.Schema({
  
    
    chatid:{ type: String,
        required: [true,'l identifiant du chat  est requis ']
    },
    contenu:{ type: String,
        required: [true,'le contenu du message  est requis ']
      },
      id_expediteur:{ type: String,
        required: [true,'l identifiant de l expediteur du message est requis ']
      },  
    est_activer: { type: Boolean, default: true, required: true },
    est_epingle: { type: Boolean, default: false, required: true },
    supprimer_pour: { type: Array,
        required: true
     },
    lu_par: { type: Array,
        required: true
     }, 


     
},
{
    timestamps: true,
});

const  message_string_Model= mongoose.model('message_string', message_string_Schema);

module.exports = message_string_Model;