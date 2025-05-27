
class  Message_link_dto {


    constructor(id_message,chatid,contenu,est_epingler,id_expediteur,type,createAt){
         this.id_message= id_message ,
         this.chatid = chatid;
         this.contenu = contenu;
         this.id_expediteur = id_expediteur;
         this.est_epingler= est_epingler;
         this.createAt= createAt;
         this.type = type;
    }
   
}
   module.exports = Message_link_dto;