const express = require("express")
const {createchat,finduserchats,findchats,updatechat} = require ("../controllers/chatControllers")
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
 */
router.post("/",createchat);
router.get("/:userID",finduserchats);
router.get("/find/:premierID/:secondID",findchats);
router.put("/:chatID",updatechat)


module.exports=  router;