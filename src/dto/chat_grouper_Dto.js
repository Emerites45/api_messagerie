
class  Chat_dto {


    constructor(id_chat,membres,nom,description,administrateur,nb_message_epingler,type,photo_profil,createAt,updatedAt){
         this.id_chat= id_chat,
         this.nom = nom;
         this.membres= membres;
         this.description=description;
         this.administrateur= administrateur;
         this.nb_message_epingler = nb_message_epingler;
         this.createAt= createAt;
         this.type= type;
         this.photo_profil= photo_profil;
         this.updatedAt= updatedAt
    }
   
}
   module.exports = Chat_dto;