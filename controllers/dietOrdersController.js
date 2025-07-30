import { 
  getAllDietOrders, 
  getDietOrderById, 
  createDietOrder, 
  updateDietOrder, 
  deleteDietOrder 
} from '../models/dietOrder.js';

// Get all diet orders
export const getAll = async (req, res) => {
  try {
    const dietOrders = await getAllDietOrders();
    res.json(dietOrders);
  } catch (err) {
    console.error('Error getting all diet orders:', err);
    res.status(500).json({ error: 'Failed to get diet orders' });
  }
};

// Get diet order by ID
export const getById = async (req, res) => {
  try {
    const dietOrder = await getDietOrderById(req.params.id);
    if (!dietOrder) {
      return res.status(404).json({ error: 'Diet order not found' });
    }
    res.json(dietOrder);
  } catch (err) {
    console.error('Error getting diet order by ID:', err);
    res.status(500).json({ error: 'Failed to get diet order' });
  }
};

// Create new diet order
export const create = async (req, res) => {
  try {
    const newDietOrder = await createDietOrder(req.body);
    res.status(201).json(newDietOrder);
  } catch (err) {
    console.error('Error creating diet order:', err);
    res.status(500).json({ error: 'Failed to create diet order' });
  }
};

// Update diet order
export const update = async (req, res) => {
  try {
    const updatedDietOrder = await updateDietOrder(req.params.id, req.body);
    if (!updatedDietOrder) {
      return res.status(404).json({ error: 'Diet order not found' });
    }
    res.json(updatedDietOrder);
  } catch (err) {
    console.error('Error updating diet order:', err);
    res.status(500).json({ error: 'Failed to update diet order' });
  }
};

// Delete diet order
export const deleteOrder = async (req, res) => {
  try {
    const deleted = await deleteDietOrder(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Diet order not found' });
    }
    res.json({ message: 'Diet order deleted successfully' });
  } catch (err) {
    console.error('Error deleting diet order:', err);
    res.status(500).json({ error: 'Failed to delete diet order' });
  }
}; 