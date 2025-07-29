import { FoodItemModel } from '../models/foodItem.js';

export const getAll = async (req, res) => {
  try {
    const foodItems = await FoodItemModel.getAll();
    res.json(foodItems);
  } catch (err) {
    console.error('Error getting food items:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getById = async (req, res) => {
  try {
    const foodItem = await FoodItemModel.getById(req.params.id);
    if (!foodItem) {
      return res.status(404).json({ error: 'Food item not found' });
    }
    res.json(foodItem);
  } catch (err) {
    console.error('Error getting food item by ID:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const create = async (req, res) => {
  try {
    const newId = await FoodItemModel.create(req.body);
    const newFoodItem = await FoodItemModel.getById(newId);
    res.status(201).json(newFoodItem);
  } catch (err) {
    console.error('Error creating food item:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const update = async (req, res) => {
  try {
    const success = await FoodItemModel.update(req.params.id, req.body);
    if (!success) {
      return res.status(404).json({ error: 'Food item not found' });
    }
    const updatedFoodItem = await FoodItemModel.getById(req.params.id);
    res.json(updatedFoodItem);
  } catch (err) {
    console.error('Error updating food item:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteFoodItem = async (req, res) => {
  try {
    const success = await FoodItemModel.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Food item not found' });
    }
    res.json({ message: 'Food item deleted successfully' });
  } catch (err) {
    console.error('Error deleting food item:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
