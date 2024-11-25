const express = require("express")
const {createchat,finduserchats,findchats,updatechat} = require ("../controllers/chatControllers")
const router = express.Router()

router.post("/",createchat);
router.get("/:userID",finduserchats);
router.get("/find/:premierID/:secondID",findchats);
router.put("/:chatID",updatechat)


module.exports=  router;