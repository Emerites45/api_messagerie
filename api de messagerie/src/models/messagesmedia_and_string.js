const mongoose = require('mongoose');

const message_media_and_string_Schema = new mongoose.Schema({
  
   
    chatid:{ type: String,
        required: [true,'l identifiant du chat  est requis ']
    },
    media:{ type: String,
        required: [true,'le chemin pour le media  est requis ']
      },
    contenu:{ type: String,
        required: [true,'le contenu du message est requis ']
      }, 
    id_expediteur:{ type: String,
        required: [true,'l identifiant de l expediteur du message est requis ']
      },  
    est_activer: { type: Boolean, default: true },
    est_epingle: { type: Boolean, default: false },
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

const  messagemedia_and_string_Model= mongoose.model('message_media_and_string', message_media_and_string_Schema);

module.exports = messagemedia_and_string_Model