
class  Message_String_dto {


    constructor(id_message,chatid,contenu,est_like,est_epingler,id_expediteur,type,createAt){
         this.id_message= id_message ,
         this.chatid = chatid;
         this.contenu = contenu;
         this.est_like= est_like;
         this.est_epingler= est_epingler;
         this.id_expediteur = id_expediteur;
         this.type = type;
         this.createAt= createAt;
        
    }
   
}
   module.exports = Message_String_dto;