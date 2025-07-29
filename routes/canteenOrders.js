/**
 * @swagger
 * tags:
 *   name: CanteenOrders
 *   description: Canteen Orders management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CanteenOrder:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         patientName:
 *           type: string
 *         bed:
 *           type: string
 *         ward:
 *           type: string
 *         dietPackageName:
 *           type: string
 *         dietType:
 *           type: string
 *         foodItems:
 *           type: array
 *           items:
 *             type: string
 *         specialNotes:
 *           type: string
 *         status:
 *           type: string
 *         prepared:
 *           type: boolean
 *         delivered:
 *           type: boolean
 *         dieticianInstructions:
 *           type: string
 *         mealItems:
 *           type: object
 *       example:
 *         id: "1752737173746"
 *         day: "1"
 *         date: "2025-07-17"
 *         time: "09:00"
 *         ampm: "AM"
 *         category: "Breakfast"
 *         fooditem: "iddli"
 *         intake_amount: "4"
 *         unit: "pcs"
 *         carbohydrates: ""
 *         proteins: ""
 *         fat: ""
 *         calories: ""
 *         end_date: ""
 *         comments: ""
 *         status: "delivered"
 *         patientId: "P007"
 *         createdAt: "2025-07-17 12:56:11"
 *         patientName: "kk"
 *         contactNumber: "7689790865"
 *
 * /canteenOrders:
 *   get:
 *     summary: Get all canteen orders
 *     tags: [CanteenOrders]
 *     responses:
 *       200:
 *         description: List of canteen orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CanteenOrder'
 *   post:
 *     summary: Create a new canteen order
 *     tags: [CanteenOrders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CanteenOrder'
 *     responses:
 *       201:
 *         description: Canteen order created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CanteenOrder'
 *
 * /canteenOrders/{id}:
 *   get:
 *     summary: Get a canteen order by ID
 *     tags: [CanteenOrders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Canteen order found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CanteenOrder'
 *   patch:
 *     summary: Update a canteen order by ID
 *     tags: [CanteenOrders]
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
 *             $ref: '#/components/schemas/CanteenOrder'
 *     responses:
 *       200:
 *         description: Canteen order updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CanteenOrder'
 *   delete:
 *     summary: Delete a canteen order by ID
 *     tags: [CanteenOrders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Canteen order deleted
 */
import express from 'express';
import { getAll, getById, create, update, deleteOrder } from '../controllers/canteenOrdersController.js';

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.patch('/:id', update);
router.delete('/:id', deleteOrder);

export default router; 