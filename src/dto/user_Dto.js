
class  User_dto {


    constructor(id_utilisateur,pseudo,role,createAt){
        this.id_utilisateur= id_utilisateur ;
         this.pseudo = pseudo;
         this.role= role;
         this.createAt= createAt;
    }
   
}
   module.exports = User_dto;