/**
 * @swagger
 * tags:
 *   name: DietRequestApproval
 *   description: Diet Request Approval management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DietRequestApproval:
 *       type: object
 *       properties:
 *         DRA_id:
 *           type: integer
 *           format: int64
 *         DRA_doctor_notes:
 *           type: string
 *         DRA_status:
 *           type: string
 *           enum: [pending, approved, rejected]
 *         DRA_approval:
 *           type: boolean
 *         DRA_added_by:
 *           type: string
 *         DRA_added_on:
 *           type: string
 *           format: date-time
 *         DRA_provider_fk:
 *           type: integer
 *           format: int64
 *         DRA_outlet_fk:
 *           type: string
 *         DRA_approved_by:
 *           type: string
 *         DRA_rejected_by:
 *           type: string
 *       example:
 *         DRA_id: 1
 *         DRA_doctor_notes: "Patient needs low-sodium diet"
 *         DRA_status: "approved"
 *         DRA_approval: true
 *         DRA_added_by: "Dr. Smith"
 *         DRA_added_on: "2025-07-28T10:30:00Z"
 *         DRA_provider_fk: 1
 *         DRA_outlet_fk: "OUTLET001"
 *         DRA_approved_by: "Dr. Smith"
 *         DRA_rejected_by: null
 *
 * /dietRequestApproval:
 *   get:
 *     summary: Get all diet request approvals
 *     tags: [DietRequestApproval]
 *     responses:
 *       200:
 *         description: List of diet request approvals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DietRequestApproval'
 *   post:
 *     summary: Create a new diet request approval
 *     tags: [DietRequestApproval]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DietRequestApproval'
 *     responses:
 *       201:
 *         description: Diet request approval created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DietRequestApproval'
 *
 * /dietRequestApproval/{id}:
 *   get:
 *     summary: Get a diet request approval by ID
 *     tags: [DietRequestApproval]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Diet request approval found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DietRequestApproval'
 *   patch:
 *     summary: Update a diet request approval by ID
 *     tags: [DietRequestApproval]
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
 *             $ref: '#/components/schemas/DietRequestApproval'
 *     responses:
 *       200:
 *         description: Diet request approval updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DietRequestApproval'
 *   delete:
 *     summary: Delete a diet request approval by ID
 *     tags: [DietRequestApproval]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Diet request approval deleted
 *
 * /dietRequestApproval/status/{status}:
 *   get:
 *     summary: Get diet request approvals by status
 *     tags: [DietRequestApproval]
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [pending, approved, rejected]
 *     responses:
 *       200:
 *         description: List of diet request approvals by status
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DietRequestApproval'
 *
 * /dietRequestApproval/approval/{approval}:
 *   get:
 *     summary: Get diet request approvals by approval status
 *     tags: [DietRequestApproval]
 *     parameters:
 *       - in: path
 *         name: approval
 *         required: true
 *         schema:
 *           type: string
 *           enum: [true, false]
 *     responses:
 *       200:
 *         description: List of diet request approvals by approval status
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DietRequestApproval'
 *
 * /dietRequestApproval/{id}/approve:
 *   post:
 *     summary: Approve a diet request
 *     tags: [DietRequestApproval]
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
 *             type: object
 *             properties:
 *               approvedBy:
 *                 type: string
 *               doctorNotes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Diet request approved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DietRequestApproval'
 *
 * /dietRequestApproval/{id}/reject:
 *   post:
 *     summary: Reject a diet request
 *     tags: [DietRequestApproval]
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
 *             type: object
 *             properties:
 *               rejectedBy:
 *                 type: string
 *               doctorNotes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Diet request rejected
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DietRequestApproval'
 */

import express from 'express';
import {
  getAll,
  getById,
  create,
  update,
  deleteApproval,
  getByStatus,
  getByApproval,
  approve,
  reject
} from '../controllers/dietRequestApprovalController.js';

const router = express.Router();

// Basic CRUD routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.patch('/:id', update);
router.delete('/:id', deleteApproval);

// Specialized routes
router.get('/status/:status', getByStatus);
router.get('/approval/:approval', getByApproval);
router.post('/:id/approve', approve);
router.post('/:id/reject', reject);

export default router;
