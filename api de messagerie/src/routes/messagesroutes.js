const express = require("express")
const {createmessage,getmessages} = require ("../controllers/messagesControllers")
const router = express.Router()

router.post("/",createmessage);
router.get("/:chatid",getmessages);


module.exports=  router;