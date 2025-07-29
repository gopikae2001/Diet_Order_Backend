/**
 * @swagger
 * tags:
 *   name: DietRequests
 *   description: Diet Requests management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DietRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         patientId:
 *           type: string
 *         tokenNo:
 *           type: string
 *         visitId:
 *           type: string
 *         patientName:
 *           type: string
 *         age:
 *           type: string
 *         gender:
 *           type: string
 *         contactNumber:
 *           type: string
 *         bed:
 *           type: string
 *         ward:
 *           type: string
 *         floor:
 *           type: string
 *         doctor:
 *           type: string
 *         doctorNotes:
 *           type: string
 *         status:
 *           type: string
 *         patientType:
 *           type: string
 *         email:
 *           type: string
 *         address:
 *           type: string
 *         bloodGroup:
 *           type: string
 *         date:
 *           type: string
 *         approval:
 *           type: string
 *         allergies:
 *           type: string
 *         requestedTime:
 *           type: string
 *       example:
 *         id: "1753330110417"
 *         patientId: "P019"
 *         tokenNo: "T017"
 *         visitId: "V017"
 *         patientName: "lllm"
 *         age: ""
 *         gender: ""
 *         contactNumber: "8797846512"
 *         bed: ""
 *         ward: ""
 *         floor: ""
 *         doctor: ""
 *         doctorNotes: ""
 *         status: "Diet Order Placed"
 *         patientType: "op"
 *         email: ""
 *         address: ""
 *         bloodGroup: ""
 *         date: "2025-07-24T04:08:30.417Z"
 *         approval: "Pending"
 *         allergies: ""
 *         requestedTime: "9:38 AM"
 *
 * /dietRequests:
 *   get:
 *     summary: Get all diet requests
 *     tags: [DietRequests]
 *     responses:
 *       200:
 *         description: List of diet requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DietRequest'
 *   post:
 *     summary: Create a new diet request
 *     tags: [DietRequests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DietRequest'
 *     responses:
 *       201:
 *         description: Diet request created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DietRequest'
 *
 * /dietRequests/{id}:
 *   get:
 *     summary: Get a diet request by ID
 *     tags: [DietRequests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Diet request found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DietRequest'
 *   patch:
 *     summary: Update a diet request by ID
 *     tags: [DietRequests]
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
 *             $ref: '#/components/schemas/DietRequest'
 *     responses:
 *       200:
 *         description: Diet request updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DietRequest'
 *   delete:
 *     summary: Delete a diet request by ID
 *     tags: [DietRequests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Diet request deleted
 */
import express from 'express';
const router = express.Router();
import { getAll, getById, create, update, deleteRequest } from '../controllers/dietRequestsController.js';

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.patch('/:id', update);
router.delete('/:id', deleteRequest);

export default router; 