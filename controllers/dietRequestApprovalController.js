import DietRequestApprovalModel from '../models/dietRequestApproval.js';

// Get all diet request approvals
export const getAll = async (req, res) => {
  try {
    const approvals = await DietRequestApprovalModel.getAll();
    res.json(approvals);
  } catch (error) {
    console.error('Error getting diet request approvals:', error);
    res.status(500).json({ error: 'Failed to get diet request approvals' });
  }
};

// Get diet request approval by ID
export const getById = async (req, res) => {
  try {
    const approval = await DietRequestApprovalModel.getById(req.params.id);
    if (!approval) {
      return res.status(404).json({ error: 'Diet request approval not found' });
    }
    res.json(approval);
  } catch (error) {
    console.error('Error getting diet request approval by ID:', error);
    res.status(500).json({ error: 'Failed to get diet request approval' });
  }
};

// Create new diet request approval
export const create = async (req, res) => {
  try {
    const newApproval = await DietRequestApprovalModel.create(req.body);
    res.status(201).json(newApproval);
  } catch (error) {
    console.error('Error creating diet request approval:', error);
    res.status(500).json({ error: 'Failed to create diet request approval' });
  }
};

// Update diet request approval
export const update = async (req, res) => {
  try {
    const updatedApproval = await DietRequestApprovalModel.update(req.params.id, req.body);
    if (!updatedApproval) {
      return res.status(404).json({ error: 'Diet request approval not found' });
    }
    res.json(updatedApproval);
  } catch (error) {
    console.error('Error updating diet request approval:', error);
    res.status(500).json({ error: 'Failed to update diet request approval' });
  }
};

// Delete diet request approval
export const deleteApproval = async (req, res) => {
  try {
    const deleted = await DietRequestApprovalModel.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Diet request approval not found' });
    }
    res.json({ message: 'Diet request approval deleted successfully' });
  } catch (error) {
    console.error('Error deleting diet request approval:', error);
    res.status(500).json({ error: 'Failed to delete diet request approval' });
  }
};

// Get diet request approvals by status
export const getByStatus = async (req, res) => {
  try {
    const approvals = await DietRequestApprovalModel.getByStatus(req.params.status);
    res.json(approvals);
  } catch (error) {
    console.error('Error getting diet request approvals by status:', error);
    res.status(500).json({ error: 'Failed to get diet request approvals by status' });
  }
};

// Get diet request approvals by approval status
export const getByApproval = async (req, res) => {
  try {
    const approval = req.params.approval === 'true' ? 1 : 0;
    const approvals = await DietRequestApprovalModel.getByApproval(approval);
    res.json(approvals);
  } catch (error) {
    console.error('Error getting diet request approvals by approval:', error);
    res.status(500).json({ error: 'Failed to get diet request approvals by approval' });
  }
};

// Approve a diet request
export const approve = async (req, res) => {
  try {
    const { approvedBy, doctorNotes } = req.body;
    if (!approvedBy) {
      return res.status(400).json({ error: 'approvedBy is required' });
    }
    const approvedRecord = await DietRequestApprovalModel.approve(req.params.id, approvedBy, doctorNotes);
    if (!approvedRecord) {
      return res.status(404).json({ error: 'Diet request approval not found' });
    }
    res.json(approvedRecord);
  } catch (error) {
    console.error('Error approving diet request:', error);
    res.status(500).json({ error: 'Failed to approve diet request' });
  }
};

// Reject a diet request
export const reject = async (req, res) => {
  try {
    const { rejectedBy, doctorNotes } = req.body;
    if (!rejectedBy) {
      return res.status(400).json({ error: 'rejectedBy is required' });
    }
    const rejectedRecord = await DietRequestApprovalModel.reject(req.params.id, rejectedBy, doctorNotes);
    if (!rejectedRecord) {
      return res.status(404).json({ error: 'Diet request approval not found' });
    }
    res.json(rejectedRecord);
  } catch (error) {
    console.error('Error rejecting diet request:', error);
    res.status(500).json({ error: 'Failed to reject diet request' });
  }
}; 