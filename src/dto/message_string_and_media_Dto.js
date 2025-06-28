
class  Message_String_And_Media_dto {


    constructor(id_message,chatid,contenu,media,est_epingler,id_expediteur,type,createAt){
         this.id_message= id_message ,
         this.chatid = chatid;
         this.contenu = contenu;
         this.id_expediteur = id_expediteur;
         this.est_epingler= est_epingler;
         this.media= media;
         this.createAt= createAt;
         this.type = type;
    }
   
}
   module.exports =  Message_String_And_Media_dto;