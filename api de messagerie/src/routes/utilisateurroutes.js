const express = require("express")
const {createutilisateur,listeutilisateur} = require ("../controllers/utilisateurControllers")
const router = express.Router()

/**
 * @swagger
 * /api/utilisateur:
 *   post:
 *     summary: Crée un utilisateur
 *     tags: [Utilisateur]
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 * 
 *                 id_utilisateur:
 *                     type: string
 *                 pseudo:
 *                     type: string
 *                 
 *                 adresse_mail:
 *                     type: string
 *     responses:
 *       200:
 *         description: Chat mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  id_utilisateur:
 *                   type: string
 *                  pseudo:
 *                   type: string
 *                  adresse_email:
 *                   type: string
 *                 
 *       404:
 *         description: Chat non trouvé
 */
router.post("/",createutilisateur);
router.get("/",listeutilisateur);



module.exports=  router;