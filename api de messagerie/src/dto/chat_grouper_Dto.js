
class  Chat_dto {


    constructor(id_chat,est_activer,membres,nom,description,administrateur,nb_message_epingler,createAt,type){
         this.id_chat= id_chat ,
         this.est_activer = est_activer;
         this.nom = nom;
         this.membres= membres;
         this.description=description;
         this.administrateur= administrateur;
         this.nb_message_epingler = nb_message_epingler;
         this.createAt= createAt;
         this.type= type;
    }
   
}
   module.exports = Chat_dto;