const express = require("express")
const {createmessage,getmessages, getmessagebyid, epingler_message, delete_message_for,getmessagesnoread,updatemessage,deletemessage} = require ("../controllers/messagesControllers")
const router = express.Router()

router.post("/",createmessage);
router.put("/epingler/:messageid/:type",epingler_message);
router.put("/modifier/:messageid/:type",updatemessage);
router.put("/:messageid/:type/:userid",delete_message_for);
router.put("/supprimer/:messageid/:type",deletemessage);
router.get("/:chatid/:userid",getmessages);
router.get("/non_lue/:chatid/:userid",getmessagesnoread);
router.get("/message/:messageID",getmessagebyid);



module.exports=  router;