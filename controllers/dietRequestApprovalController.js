const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../../Diet_Frontend/db.json');

function readDB() {
  return JSON.parse(fs.readFileSync(dbPath));
}
function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

exports.getAll = (req, res) => {
  const db = readDB();
  res.json(db.dietRequestApproval);
};

exports.getById = (req, res) => {
  const db = readDB();
  const item = db.dietRequestApproval.find(o => o.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
};

exports.create = (req, res) => {
  const db = readDB();
  const newApproval = { id: Date.now().toString(), ...req.body };
  db.dietRequestApproval.push(newApproval);
  writeDB(db);
  res.status(201).json(newApproval);
};

exports.update = (req, res) => {
  const db = readDB();
  const idx = db.dietRequestApproval.findIndex(o => o.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.dietRequestApproval[idx] = { ...db.dietRequestApproval[idx], ...req.body };
  writeDB(db);
  res.json(db.dietRequestApproval[idx]);
};

exports.delete = (req, res) => {
  const db = readDB();
  const idx = db.dietRequestApproval.findIndex(o => o.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const deleted = db.dietRequestApproval.splice(idx, 1);
  writeDB(db);
  res.json(deleted[0]);
}; 