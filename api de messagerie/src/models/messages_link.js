const mongoose = require('mongoose');

const message_link_Schema = new mongoose.Schema({
  
    
    chatid:{ type: String,
        required: [true,'l identifiant du chat  est requis ']
    },
    contenu:{ type: String,
        required: [true,'le contenu du message  est requis ']
      },
      id_expediteur:{ type: String,
        required: [true,'l identifiant de l expediteur du message est requis ']
      },  
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

const  message_link_Model= mongoose.model('message_link', message_link_Schema);

module.exports = message_link_Model;