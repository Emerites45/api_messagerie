const  dossier_Model = require ("../models/dossier")
let dossier_dto = require("../dto/dossier_Dto")
const { ObjectId } = require('mongodb'); 

class  Dossier {

   
    constructor(nom,description,user_id){
         this.nom = nom;
         this.description = description;
         this.user_id = user_id;
    }
    
async     cree_dossier(dossiers){

        let dossier = {
             nom:dossiers.nom,
             description:dossiers.description,
             user_id: dossiers.user_id,

            } 
              let newdossier =  new dossier_Model(dossier)
            const  response =  await newdossier.save()
              return response
    }


async    rechercher_dossier(nom){
       
   
            const dossiers = await dossier_Model.findOne({
                nom: nom})

            const dossier = new dossier_dto(
                    dossiers.id_dossier,
                    dossiers.nom,
                    dossiers.description,
                   );

                return dossier;
    
    }


async    liste_dossier( userid){
        let liste_dossier= []
        const  dossiers = await dossier_Model.find({user_id:userid})
       
     
        for (const element of dossiers) {
                const dossier = new dossier_dto(
                 element.id_dossier,
                 element.nom,
                 element.description,
                );
                liste_dossier.push(dossier);
                console.log("on a ce nombre de dossier :" + liste_dossier.length);
            } 
        return liste_dossier;
    }

   

async    modifier_dossier(id_dossier,dossier)
    {
        console.log("le dossier id: "+id_dossier)
        const objectid= new ObjectId(id_dossier)
        const element= {$set:dossier} 
       
        const result = await dossier_Model.updateOne({_id:id_dossier},element);
        return result
    }

   
 async  supprimer_dossier(id_dossier){
    const objectid= new ObjectId(id_dossier);
     let response=""
    const dossier = await dossier_Model.findByIdAndDelete(objectid);
 
   if(dossier){
        response= "dossier supprimer avec succes "
   }
   else{
    response="dossier inexistant"
   }
   return response;   
  }
   
}
   module.exports = Dossier;