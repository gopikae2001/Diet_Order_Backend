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
  const db = readDB();
  res.json(db.dietRequests);
};

export const getById = (req, res) => {
  const db = readDB();
  const item = db.dietRequests.find(o => o.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
};

export const create = (req, res) => {  
  const db = readDB();
  const newRequest = { id: Date.now().toString(), ...req.body };
  db.dietRequests.push(newRequest);
  writeDB(db);
  res.status(201).json(newRequest);
};

export const update = (req, res) => {
  const db = readDB();
  const idx = db.dietRequests.findIndex(o => o.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.dietRequests[idx] = { ...db.dietRequests[idx], ...req.body };
  writeDB(db);
  res.json(db.dietRequests[idx]);
};

export const deleteRequest = (req, res) => {
  const db = readDB();
  const idx = db.dietRequests.findIndex(o => o.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const deleted = db.dietRequests.splice(idx, 1);
  writeDB(db);
  res.json(deleted[0]);
}; 