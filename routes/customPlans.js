/**
 * @swagger
 * tags:
 *   name: CustomPlans
 *   description: Custom Plans management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CustomPlan:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         packageName:
 *           type: string
 *         dietType:
 *           type: string
 *         meals:
 *           type: object
 *         amount:
 *           type: number
 *
 * /customPlans:
 *   get:
 *     summary: Get all custom plans
 *     tags: [CustomPlans]
 *     responses:
 *       200:
 *         description: List of custom plans
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CustomPlan'
 *   post:
 *     summary: Create a new custom plan
 *     tags: [CustomPlans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomPlan'
 *     responses:
 *       201:
 *         description: Custom plan created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomPlan'
 *
 * /customPlans/{id}:
 *   get:
 *     summary: Get a custom plan by ID
 *     tags: [CustomPlans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Custom plan found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomPlan'
 *   patch:
 *     summary: Update a custom plan by ID
 *     tags: [CustomPlans]
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
 *             $ref: '#/components/schemas/CustomPlan'
 *     responses:
 *       200:
 *         description: Custom plan updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomPlan'
 *   delete:
 *     summary: Delete a custom plan by ID
 *     tags: [CustomPlans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Custom plan deleted
 */
import express from 'express';
import { getAll, getById, create, update, deletePlan } from '../controllers/customPlansController.js';

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.patch('/:id', update);
router.delete('/:id', deletePlan);

export default router; 