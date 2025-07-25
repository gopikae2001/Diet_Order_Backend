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
 *         id:
 *           type: string
 *         requestId:
 *           type: string
 *         approvedBy:
 *           type: string
 *         approvalStatus:
 *           type: string
 *         approvalDate:
 *           type: string
 *         notes:
 *           type: string
 *       example:
 *         id: "1"
 *         requestId: "1753330110417"
 *         approvedBy: "admin"
 *         approvalStatus: "approved"
 *         approvalDate: "2025-07-24T10:00:00.000Z"
 *         notes: "Approved for special diet."
 *
 * /Diet Request approval:
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
 * /Diet Request approval/{id}:
 *   get:
 *     summary: Get a diet request approval by ID
 *     tags: [DietRequestApproval]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *           type: string
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
 *           type: string
 *     responses:
 *       200:
 *         description: Diet request approval deleted
 */
const express = require('express');
const router = express.Router();
const controller = require('../controllers/dietRequestApprovalController');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router; 