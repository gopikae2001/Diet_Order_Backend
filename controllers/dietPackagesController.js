import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '../db.json');

function readDB() {
  return JSON.parse(fs.readFileSync(dbPath));
}
function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

export const getAll = (req, res) => {
  try {
    const db = readDB();
    res.json(db.dietPackages || []);
  } catch (error) {
    console.error('Error getting diet packages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getById = (req, res) => {
  try {
    const db = readDB();
    const item = db.dietPackages.find(p => p.id === req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (error) {
    console.error('Error getting diet package by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const create = (req, res) => {
  try {
    const db = readDB();
    const newPackage = { id: Date.now().toString(), ...req.body };

    if (!db.dietPackages) db.dietPackages = [];
    db.dietPackages.push(newPackage);

    writeDB(db);
    res.status(201).json(newPackage);
  } catch (error) {
    console.error('Error creating diet package:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const update = (req, res) => {
  try {
    const db = readDB();
    const idx = db.dietPackages.findIndex(p => p.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });

    db.dietPackages[idx] = { ...db.dietPackages[idx], ...req.body };
    writeDB(db);
    res.json(db.dietPackages[idx]);
  } catch (error) {
    console.error('Error updating diet package:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deletePackage = (req, res) => {
  try {
    const db = readDB();
    const idx = db.dietPackages.findIndex(p => p.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });

    const deleted = db.dietPackages.splice(idx, 1);
    writeDB(db);
    res.json(deleted[0]);
  } catch (error) {
    console.error('Error deleting diet package:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
