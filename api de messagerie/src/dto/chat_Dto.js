
class  Chat_dto {


    constructor(id_chat,est_activer=true,nom,type){
        this.id_chat= id_chat ;
        
         this.est_activer= est_activer;
         this.nom = nom;
         this.type= type;
    }
   
}
   module.exports = Chat_dto;