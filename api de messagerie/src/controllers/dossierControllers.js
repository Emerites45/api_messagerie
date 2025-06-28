const dossierModel=  require("../models/dossier")
const Dossier = require("../classes/dossierClasse")






//creation chat
const createfolder = async(req,res)  => {


        try{
       let reponse=""
        let dossier= new Dossier(req.body.nom,req.body.description,req.body.user_id)
       
       await  dossier.cree_dossier(dossier).then(() => reponse='dossier sauvegardé avec succès !')
            .catch(err => {
          console.error('Erreur de validation :', err.message);
          reponse = err.message;
          
        });

         res.json({reponse})

    }
    catch(error){
        console.log(error)
        res.status(500).json({ error})
    }
} ;



//modifier un chat 

 const updatefolder =  async(req,res)  => {
    const  id_dossier =  req.params.id_dossier
    
    try{
        let dossier= new Dossier(req.body.nom,req.body.description,req.body.user_id)
        
          let   response= await dossier.modifier_dossier(id_dossier,dossier);
            
         res.status(200).json(response);

    }
    catch(error){
        console.log(error)
        res.status(500).json(error)
      }
}



//supprimer un doddiers

const deletefolder=  async(req,res)  => {
  try{ 
    
     
      const id_dossier = req.params.id_dossier
  
      let dossier= new Dossier()
      response= await  dossier.supprimer_dossier(id_dossier) 
      res.status(200).json(response);
  }
  catch(error){
      console.log(error)
      res.status(500).json(error)
  }

}

// rechercher un dossier


const findfolder =  async(req,res)  => {

       let {nom} = req.params
    try
    {
        let dossier= new Dossier()
       dossier = dossier.rechercher_dossier(nom)
        res.status(200).json(dossier)

    }
    catch(error){
      console.log(error)
      res.status(500).json(error)
    }
};


const finduserfolders =  async(req,res)  => {

  
    const userID = req.params.userID

    try
    {    
 
         let dossier =  new Dossier()
      
       const liste_dossier= await dossier.liste_dossier(userID);
     
  
        res.status(200).json(liste_dossier);
    }
    catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}



// lister les dossier 




module.exports= {createfolder,finduserfolders,findfolder,updatefolder,deletefolder}
