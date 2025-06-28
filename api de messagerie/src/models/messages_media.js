const mongoose = require('mongoose');

const message_media_Schema = new mongoose.Schema({
  
    
    chatid: { type: String,
        required: [true,'l identifiant du chat  est requis ']
    },
    media:
    { type: String,
      required: [true,'le chemin pour le media  est requis ']
    },
    est_epingle: { type: Boolean, default: false, required: true  },
    id_expediteur:{ type: String,
        required: [true,'l identifiant de l expediteur du message est requis ']
      },  
    lu_par: { type: Array,
        required: true
     }, 
    supprimer_pour:
    { type: Array,
       required: true
    },
},
{
    timestamps: true,
});

const  message_mediaModel= mongoose.model('message_media', message_media_Schema);

module.exports = message_mediaModel;