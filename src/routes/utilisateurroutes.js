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
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               pseudo:
 *                 type: string
 *               adresse_mail:
 *                 type: string
 *               role:
 *                 type: string
 *               photo_profil:
 *                 type: string
 *             required:
 *               - pseudo
 *               - adresse_mail
 *               
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_utilisateur:
 *                   type: string
 *                 pseudo:
 *                   type: string
 *                 adresse_mail:
 *                   type: string
 *       400:
 *         description: Requête invalide, données manquantes ou incorrectes
 *
 * /api/utilisateur/list:
 *   get:
 *     summary: Liste des utilisateurs
 *     tags: [Utilisateur]
 *     responses:
 *       200:
 *         description: Détails des utilisateurs récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   pseudo:
 *                     type: string
 *                   role:
 *                     type: string
 *                   adresse_mail:
 *                     type: string
 *                   photo_profil:
 *                     type: string
 */

router.post("/",createutilisateur);
router.get("/list",listeutilisateur);



module.exports=  router;