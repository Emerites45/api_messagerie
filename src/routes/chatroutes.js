const express = require("express")
const {createchat,finduserchats,findchats,updatechat,add_favorite,archiver_chat,deletechats} = require ("../controllers/chatControllers")
const router = express.Router()
/**
 * @swagger
 * /api/chat:
 *   post:
 *     summary: Crée un chat
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               photo_profil:
 *                 type: string
 *               description:
 *                 type: string
 *               membres:
 *                 type: array
 *                 items:
 *                   type: string  # Définir que chaque élément est une chaîne
 *               administrateur:
 *                 type: array
 *                 items:
 *                   type: string  # Définir que chaque élément est une chaîne
 *               type:
 *                 type: string
 *                 enum: [individuel, groupe]  # Définir les choix possibles
 *                 description: Type de chat, soit 'individuel' soit 'groupe'
 *              
 *     responses:
 *       200:
 *         description: Chat crée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 
 *       500:
 *         description: la creation du  Chat  n'a pas éte faite
 * 
 * /api/chat/{userId}:
 *   get:
 *     summary: liste des chats d'un utilisateur
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to get
 *     responses:
 *       "200":
 *         description: Détails des chats récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 liste_chat_individuel:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_chat:
 *                         type: string
 *                       est_activer:
 *                         type: boolean
 *                       nom:
 *                         type: string
 *                       type:
 *                         type: string 
 *                 liste_chat_grouper:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_chat:
 *                         type: string
 *                       est_activer:
 *                         type: boolean
 *                       nom:
 *                         type: string
 *                       membres:
 *                         type: array
 *                         items:
 *                           type: string 
 *                       description:
 *                         type: string 
 *                       administrateur:
 *                         type: array
 *                         items:
 *                           type: string 
 *                       nb_message_epingler:
 *                         type: integer 
 *                       type:
 *                         type: string     
 *                 liste_chat_archiver_individuel:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_chat:
 *                         type: string
 *                       est_activer:
 *                         type: boolean
 *                       nom:
 *                         type: string
 *                       type:
 *                         type: string 
 *                 liste_chat_archiver_grouper:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_chat:
 *                         type: string
 *                       est_activer:
 *                         type: boolean
 *                       nom:
 *                         type: string
 *                       membres:
 *                         type: array
 *                         items:
 *                           type: string 
 *                       description:
 *                         type: string 
 *                       administrateur:
 *                         type: array
 *                         items:
 *                           type: string 
 *                       nb_message_epingler:
 *                         type: integer 
 *                       type:
 *                         type: string     
 * 
 * /api/chat/{chatID}:
 *   put:
 *     summary: Modifier un chat
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: chatID
 *         schema:
 *           type: string
 *         required: true
 *         description: Numeric ID of the chat to get
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               membres:
 *                 type: array
 *                 items:
 *                   type: string  # Définir que chaque élément est une chaîne
 *               administrateurs:
 *                 type: array
 *                 items:
 *                   type: string  # Définir que chaque élément est une chaîne
 *               nom:
 *                 type: string
 *               description:
 *                 type: string
 *               type:
 *                 type: string
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
 * /api/chat/favorite/{chatID}/{userID}/type:
 *   put:
 *     summary: Mettre un chat parmis les favorites un chat
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: chatID
 *         schema:
 *           type: string
 *         required: true
 *         description: string ID of the chat to get
 *       - in: path
 *         name: userID
 *         schema:
 *           type: string
 *         required: true
 *         description: string ID of the user to concern
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *           enum: [individuel, groupe]  # Définir les choix possibles
 *         required: true
 *         description: Type de chat, soit 'individuel' soit 'groupe'
 * /api/chat/archive/{chatID}/{userID}/type:
 *   put:
 *     summary: Archiver un chat
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: chatID
 *         schema:
 *           type: string
 *         required: true
 *         description: Numeric ID of the chat to get
 *       - in: path
 *         name: userID
 *         schema:
 *           type: string
 *         required: true
 *         description: string ID of the user to concern
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *           enum: [individuel, groupe]  # Définir les choix possibles
 *         required: true
 *         description: Type de chat, soit 'individuel' soit 'groupe'
 */


 
router.post("/",createchat);

router.get("/:userID",finduserchats);
router.get("/find/:premierID/:secondID",findchats);
router.put("/:chatID",updatechat)
router.put("/favorite/:chatID/:userID/:type",add_favorite)
router.put("/archive/:chatID/:userID/:type",archiver_chat)
router.delete("/:chatID/:type",deletechats)


module.exports=  router;