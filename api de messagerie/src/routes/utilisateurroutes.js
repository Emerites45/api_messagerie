const express = require("express")
const {createutilisateur,listeutilisateur} = require ("../controllers/utilisateurControllers")
const router = express.Router()

router.post("/",createutilisateur);
router.get("/",listeutilisateur);



module.exports=  router;