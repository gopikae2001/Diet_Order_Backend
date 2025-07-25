/**
 * @swagger
 * tags:
 *   name: DietOrders
 *   description: Diet Orders management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DietOrder:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         patientName:
 *           type: string
 *         patientId:
 *           type: string
 *         contactNumber:
 *           type: string
 *         age:
 *           type: string
 *         bed:
 *           type: string
 *         ward:
 *           type: string
 *         floor:
 *           type: string
 *         doctor:
 *           type: string
 *         dietPackage:
 *           type: string
 *         packageRate:
 *           type: string
 *         startDate:
 *           type: string
 *         endDate:
 *           type: string
 *         doctorNotes:
 *           type: string
 *         status:
 *           type: string
 *         approvalStatus:
 *           type: string
 *         dieticianInstructions:
 *           type: string
 *         gender:
 *           type: string
 *         patientType:
 *           type: string
 *         email:
 *           type: string
 *         address:
 *           type: string
 *         bloodGroup:
 *           type: string
 *         tokenNo:
 *           type: string
 *         visitId:
 *           type: string
 *       example:
 *         id: "1752050988003"
 *         patientName: "gj"
 *         patientId: "p001"
 *         contactNumber: "9888888888"
 *         age: "38 years"
 *         bed: "007"
 *         ward: "14"
 *         floor: ""
 *         dietPackage: "1751889270121"
 *         packageRate: "60"
 *         startDate: "2025-07-09"
 *         endDate: "2025-08-01"
 *         doctorNotes: ""
 *         status: "stopped"
 *         approvalStatus: "rejected"
 *         dieticianInstructions: ""
 *
 * /dietOrders:
 *   get:
 *     summary: Get all diet orders
 *     tags: [DietOrders]
 *     responses:
 *       200:
 *         description: List of diet orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DietOrder'
 *   post:
 *     summary: Create a new diet order
 *     tags: [DietOrders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DietOrder'
 *     responses:
 *       201:
 *         description: Diet order created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DietOrder'
 *
 * /dietOrders/{id}:
 *   get:
 *     summary: Get a diet order by ID
 *     tags: [DietOrders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Diet order found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DietOrder'
 *   patch:
 *     summary: Update a diet order by ID
 *     tags: [DietOrders]
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
 *             $ref: '#/components/schemas/DietOrder'
 *     responses:
 *       200:
 *         description: Diet order updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DietOrder'
 *   delete:
 *     summary: Delete a diet order by ID
 *     tags: [DietOrders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Diet order deleted
 */
const express = require('express');
const router = express.Router();
const controller = require('../controllers/dietOrdersController');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router; 