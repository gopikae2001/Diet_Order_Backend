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
 *         DO_ID_PK:
 *           type: integer
 *           format: int64
 *         DO_patientName:
 *           type: string
 *         DO_patientId:
 *           type: string
 *         DO_contactNumber:
 *           type: string
 *         DO_age:
 *           type: string
 *         DO_bed:
 *           type: string
 *         DO_ward:
 *           type: string
 *         DO_floor:
 *           type: string
 *         DO_doctor:
 *           type: string
 *         DO_dietPackage:
 *           type: string
 *         DO_packageRate:
 *           type: number
 *           format: decimal
 *         DO_startDate:
 *           type: string
 *           format: date
 *         DO_endDate:
 *           type: string
 *           format: date
 *         DO_doctorNotes:
 *           type: string
 *         DO_status:
 *           type: string
 *           enum: [pending, approved, rejected, completed]
 *         DO_approvalStatus:
 *           type: string
 *           enum: [pending, approved, rejected]
 *         DO_dieticianInstructions:
 *           type: string
 *         DO_gender:
 *           type: string
 *           enum: [Male, Female, Other]
 *         DO_patientType:
 *           type: string
 *         DO_email:
 *           type: string
 *         DO_address:
 *           type: string
 *         DO_bloodGroup:
 *           type: string
 *         DO_tokenNo:
 *           type: string
 *         DO_visitId:
 *           type: string
 *         DO_added_by:
 *           type: string
 *         DO_added_on:
 *           type: string
 *           format: date-time
 *         DO_modified_by:
 *           type: string
 *         DO_modified_on:
 *           type: string
 *           format: date-time
 *         DO_outlet_fk:
 *           type: string
 *       example:
 *         DO_ID_PK: 1
 *         DO_patientName: "John Doe"
 *         DO_patientId: "P001"
 *         DO_contactNumber: "9888888888"
 *         DO_age: "38 years"
 *         DO_bed: "007"
 *         DO_ward: "14"
 *         DO_floor: "2nd Floor"
 *         DO_doctor: "Dr. Smith"
 *         DO_dietPackage: "Standard Diet"
 *         DO_packageRate: 60.00
 *         DO_startDate: "2025-07-09"
 *         DO_endDate: "2025-08-01"
 *         DO_doctorNotes: "Patient requires low sodium diet"
 *         DO_status: "pending"
 *         DO_approvalStatus: "pending"
 *         DO_dieticianInstructions: "Monitor sodium intake"
 *         DO_gender: "Male"
 *         DO_patientType: "Inpatient"
 *         DO_email: "john.doe@email.com"
 *         DO_address: "123 Main St, City"
 *         DO_bloodGroup: "O+"
 *         DO_tokenNo: "T001"
 *         DO_visitId: "V001"
 *         DO_added_by: "admin"
 *         DO_added_on: "2025-07-29T10:00:00Z"
 *         DO_outlet_fk: "OUTLET001"

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
 *           type: integer
 *           format: int64
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
 *           type: integer
 *           format: int64
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
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Diet order deleted
 */
import express from 'express';
import { getAll, getById, create, update, deleteOrder } from '../controllers/dietOrdersController.js';

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.patch('/:id', update);
router.delete('/:id', deleteOrder);

export default router;