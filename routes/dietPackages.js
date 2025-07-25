/**
 * @swagger
 * tags:
 *   name: DietPackages
 *   description: Diet Packages management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DietPackage:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         type:
 *           type: string
 *         breakfast:
 *           type: array
 *           items:
 *             type: object
 *         brunch:
 *           type: array
 *           items:
 *             type: object
 *         lunch:
 *           type: array
 *           items:
 *             type: object
 *         dinner:
 *           type: array
 *           items:
 *             type: object
 *         evening:
 *           type: array
 *           items:
 *             type: object
 *         totalRate:
 *           type: number
 *         totalNutrition:
 *           type: object
 *           properties:
 *             calories:
 *               type: number
 *             protein:
 *               type: number
 *             carbohydrates:
 *               type: number
 *             fat:
 *               type: number
 *
 * /dietPackages:
 *   get:
 *     summary: Get all diet packages
 *     tags: [DietPackages]
 *     responses:
 *       200:
 *         description: List of diet packages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DietPackage'
 *   post:
 *     summary: Create a new diet package
 *     tags: [DietPackages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DietPackage'
 *     responses:
 *       201:
 *         description: Diet package created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DietPackage'
 *
 * /dietPackages/{id}:
 *   get:
 *     summary: Get a diet package by ID
 *     tags: [DietPackages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Diet package found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DietPackage'
 *   patch:
 *     summary: Update a diet package by ID
 *     tags: [DietPackages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DietPackage'
 *     responses:
 *       200:
 *         description: Diet package updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DietPackage'
 *   delete:
 *     summary: Delete a diet package by ID
 *     tags: [DietPackages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Diet package deleted
 */
const express = require('express');
const router = express.Router();
const controller = require('../controllers/dietPackagesController');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router; 