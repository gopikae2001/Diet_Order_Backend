/**
 * @swagger
 * tags:
 *   name: FoodItems
 *   description: Food Items management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FoodItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         foodType:
 *           type: string
 *         category:
 *           type: string
 *         unit:
 *           type: string
 *         quantity:
 *           type: string
 *         calories:
 *           type: string
 *         protein:
 *           type: string
 *         carbohydrates:
 *           type: string
 *         fat:
 *           type: string
 *         price:
 *           type: string
 *         pricePerUnit:
 *           type: string
 *
 * /foodItems:
 *   get:
 *     summary: Get all food items
 *     tags: [FoodItems]
 *     responses:
 *       200:
 *         description: List of food items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FoodItem'
 *   post:
 *     summary: Create a new food item
 *     tags: [FoodItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FoodItem'
 *     responses:
 *       201:
 *         description: Food item created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FoodItem'
 *
 * /foodItems/{id}:
 *   get:
 *     summary: Get a food item by ID
 *     tags: [FoodItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Food item found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FoodItem'
 *   patch:
 *     summary: Update a food item by ID
 *     tags: [FoodItems]
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
 *             $ref: '#/components/schemas/FoodItem'
 *     responses:
 *       200:
 *         description: Food item updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FoodItem'
 *   delete:
 *     summary: Delete a food item by ID
 *     tags: [FoodItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Food item deleted
 */
import express from 'express';
import { getAll, getById, create, update, deleteFoodItem } from '../controllers/foodItemsController.js';

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.patch('/:id', update);
router.delete('/:id', deleteFoodItem);

export default router; 