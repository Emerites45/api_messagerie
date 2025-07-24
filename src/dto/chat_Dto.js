
class  Chat_dto {


    constructor(id_chat,nom,type,photo_profil,createAt,updatedAt){
        this.id_chat= id_chat ;
         this.nom = nom;
         this.type= type;
         this.photo_profil= photo_profil;
         this.createAt= createAt;
         this.updatedAt= updatedAt
    }
   
}
   module.exports = Chat_dto;