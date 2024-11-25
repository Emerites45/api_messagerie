const utilisateurModel= require("../models/Users")
const Utilisateur = require("../classes/utilisateur")



//creation utilisateur

const createutilisateur = async(req,res)  => {

    try{

        let utilisateur= new Utilisateur(req.body.id_utilisateur,req.body.pseudo,req.body.adresse_mail)
        let newutilisateur = new utilisateurModel(utilisateur)
        const response = await  newutilisateur.save()
        res.status(200).json(response)


    }
    catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}


// liste de tous les utilisateur 

const listeutilisateur = async(req,res)  => {

    try{
           const utilisateurs =  await  utilisateurModel.find()
           res.status(200).json(utilisateurs)
    } catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}


module.exports={createutilisateur,listeutilisateur}