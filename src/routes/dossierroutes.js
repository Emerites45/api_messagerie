const express = require("express")
const {createfolder,finduserfolders,findfolder,updatefolder,deletefolder} = require ("../controllers/dossierControllers")
const router = express.Router()
/**
 * @swagger
 * /api/dossier:
 *   post:
 *     summary: Crée un dossier 
 *     tags: [Dossier]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               description:
 *                 type: string
 *               user_id:
 *                 type: string
 *                
 *     responses:
 *       200:
 *         description: Chat mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 
 *       404:
 *         description: Chat non trouvé
 * 
 * /api/dossier/{nom}:
 *   get:
 *     summary: liste des dossiers d'un utilisateur
 *     tags: [Dossier]
 *     parameters:
 *       - in: path
 *         name: nom
 *         schema:
 *           type: string
 *         required: true
 *         description: Numeric ID of the user to get
 *     responses:
 *       "200":
 *         description: Détails des dossier récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 liste_dossier:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_dossier:
 *                         type: string
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

 
router.post("/",createfolder);
router.get("/:userID",finduserfolders);
router.get("/find/:nom",findfolder);
router.put("/:id_dossier",updatefolder);
router.delete("/:id_dossier",deletefolder);


module.exports=  router;