
class  Message_media_dto {


    constructor(id_message,chatid,media,est_activer,est_epingle,id_expediteur,type,createAt){
         this.id_message= id_message ,
         this.chatid = chatid;
         this.est_activer = est_activer;
         this.id_expediteur = id_expediteur;
         this.est_epingle= est_epingle;
         this.media= media;
         this.createAt= createAt;
         this.type = type;
    }
   
}
   module.exports = Message_media_dto;