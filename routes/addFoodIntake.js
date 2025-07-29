/**
 * @swagger
 * tags:
 *   name: AddFoodIntake
 *   description: Food Intake management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AddFoodIntake:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         patientId:
 *           type: string
 *         foodItemId:
 *           type: string
 *         quantity:
 *           type: number
 *         time:
 *           type: string
 *         date:
 *           type: string
 *         notes:
 *           type: string
 *       example:
 *         id: "1"
 *         patientId: "P001"
 *         foodItemId: "527e"
 *         quantity: 2
 *         time: "09:00"
 *         date: "2025-07-24"
 *         notes: "Breakfast intake."
 *
 * /AddFoodIntake:
 *   get:
 *     summary: Get all food intake entries
 *     tags: [AddFoodIntake]
 *     responses:
 *       200:
 *         description: List of food intake entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AddFoodIntake'
 *   post:
 *     summary: Create a new food intake entry
 *     tags: [AddFoodIntake]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddFoodIntake'
 *     responses:
 *       201:
 *         description: Food intake entry created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddFoodIntake'
 *
 * /AddFoodIntake/{id}:
 *   get:
 *     summary: Get a food intake entry by ID
 *     tags: [AddFoodIntake]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Food intake entry found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddFoodIntake'
 *   patch:
 *     summary: Update a food intake entry by ID
 *     tags: [AddFoodIntake]
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
 *             $ref: '#/components/schemas/AddFoodIntake'
 *     responses:
 *       200:
 *         description: Food intake entry updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddFoodIntake'
 *   delete:
 *     summary: Delete a food intake entry by ID
 *     tags: [AddFoodIntake]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Food intake entry deleted
 */
import express from 'express';
import { getAll, getById, create, update, deleteIntake } from '../controllers/addFoodIntakeController.js';

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.patch('/:id', update);
router.delete('/:id', deleteIntake);

export default router; 