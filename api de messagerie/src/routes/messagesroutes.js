const express = require("express")
const {createmessage,getmessages, getmessagebyid, epingler_message, delete_message_for,getmessagesnoread,updatemessage,deletemessage} = require ("../controllers/messagesControllers")
const router = express.Router()
/**
 * @swagger
 * /api/message:
 *   post:
 *     summary: Crée message
 *     tags: [Message]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               etat:
 *                 type: boolean
 *               medias:
 *                 type: array
 *                 items:
 *                   type: string  # Définir que chaque élément est une chaîne
 *               contenu:
 *                 type: string
 *               chatid:
 *                 type: string
 *               id_expediteur:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [string, media, string_and_media]  # Définir les choix possibles
 *                 description: Type de message, soit 'string' soit 'media' soit 'string_and_media'
 * 
 *     responses:
 *       200:
 *         description: Chat mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 membres:
 *                   type: array
 *                   items:
 *                     type: string  # Définir que chaque élément est une chaîne
 *                 administrateurs:
 *                   type: array
 *                   items:
 *                     type: string  # Définir que chaque élément est une chaîne
 *                 nom:
 *                   type: string
 *                 description:
 *                   type: string
 *                 type:
 *                   type: string
 *       404:
 *         description: Chat non trouvé
 * 
 * /api/messages/epingler/{messageid}/{type}:
 *   put:
 *     summary: Epingler un message
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: messageid
 *         schema:
 *           type: string
 *         required: true
 *         description: Numeric ID of the chat to get 
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *           enum: [string, media, string_and_media]  # Définir les choix possibles
 *         required: true
 *         description: Type de message 
 *     responses:
 *       200:
 *         description: Chat mis à jour avec succès
 * 
 * /api/messages/modifier/{messageid}/{type}:
 *   put:
 *     summary: Modifier un message
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: messageid
 *         schema:
 *           type: string
 *         required: true
 *         description: Numeric ID of the chat to get 
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *           enum: [string, media, string_and_media]  # Définir les choix possibles
 *         required: true
 *         description: Type de message 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               etat:
 *                 type: boolean
 *               medias:
 *                 type: array
 *                 items:
 *                   type: string  # Définir que chaque élément est une chaîne
 *               contenu:
 *                 type: string
 *               chatid:
 *                 type: string
 *               id_expediteur:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [string, media, string_and_media]  # Définir les choix possibles
 *                 description: Type de message, soit 'string' soit 'media' soit 'string_and_media'
 * 
 *     responses:
 *       200:
 *         description: Chat mis à jour avec succès 
 * 
 * /api/messages/{messageid}/{type}/{userid}:
 *   put:
 *     summary: Supprime un message pour
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: messageid
 *         schema:
 *           type: string
 *         required: true
 *         description: Numeric ID of the chat to get 
 *       - in: path
 *         name: userid
 *         schema:
 *           type: string
 *         required: true
 *         description: Numeric ID of the chat to get 
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *           enum: [string, media, string_and_media]  # Définir les choix possibles
 *         required: true
 *         description: Type de message 
 *     responses:
 *       200:
 *         description: Chat mis à jour avec succès 
 * 
 * /api/supprimer/{messageid}/{type}:
 *   put:
 *     summary: Supprime un message pour
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: messageid
 *         schema:
 *           type: string
 *         required: true
 *         description: Numeric ID of the chat to get 
 *       - in: path
 *         name: userid
 *         schema:
 *           type: string
 *         required: true
 *         description: Numeric ID of the chat to get 
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *           enum: [string, media, string_and_media]  # Définir les choix possibles
 *         required: true
 *         description: Type de message 
 *     responses:
 *       200:
 *         description: Chat mis à jour avec succès 
 * 
 * /api/messages/message/{messageID}:
 *   get:
 *     summary: liste des chats d'un utilisateur
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: messageID
 *         schema:
 *           type: string
 *         required: true
 *         description: Numeric ID of the user to get
 *       - in: path
 *         name: chatId
 *         schema:
 *           type: string  
 *         required: true
 *         description: Numeric ID of the user to get
 *     responses:
 *       "200":
 *         description: Détails des chats récupérés avec succès
 * 
 * /api/messages/{chatid}/{userId}:
 *   get:
 *     summary: liste des messages d'un utilisateur
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: Numeric ID of the user to get
 *       - in: path
 *         name: chatId
 *         schema:
 *           type: string  
 *         required: true
 *         description: Numeric ID of the user to get
 *     responses:
 *       "200":
 *         description: Détails des chats récupérés avec succès
 * 
 * /api/messages/non_lue/{chatid}/{userId}:
 *   get:
 *     summary: liste des messages non lue d'un utilisateur
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: Numeric ID of the user to get
 *       - in: path
 *         name: chatId
 *         schema:
 *           type: string  
 *         required: true
 *         description: Numeric ID of the user to get
 *     responses:
 *       "200":
 *         description: Détails des chats récupérés avec succès
 * */
router.post("/",createmessage);
router.put("/epingler/:messageid/:type",epingler_message);
router.put("/modifier/:messageid/:type",updatemessage);
router.put("/:messageid/:type/:userid",delete_message_for);
router.put("/supprimer/:messageid/:type",deletemessage);
router.get("/:chatid/:userid",getmessages);
router.get("/non_lue/:chatid/:userid",getmessagesnoread);
router.get("/message/:messageID",getmessagebyid);



module.exports=  router;