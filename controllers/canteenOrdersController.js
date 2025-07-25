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
  res.json(db.canteenOrders);
};

exports.getById = (req, res) => {
  const db = readDB();
  const item = db.canteenOrders.find(o => o.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
};

exports.create = (req, res) => {
  const db = readDB();
  const newOrder = { id: Date.now().toString(), ...req.body };
  db.canteenOrders.push(newOrder);
  writeDB(db);
  res.status(201).json(newOrder);
};

exports.update = (req, res) => {
  const db = readDB();
  const idx = db.canteenOrders.findIndex(o => o.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.canteenOrders[idx] = { ...db.canteenOrders[idx], ...req.body };
  writeDB(db);
  res.json(db.canteenOrders[idx]);
};

exports.delete = (req, res) => {
  const db = readDB();
  const idx = db.canteenOrders.findIndex(o => o.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const deleted = db.canteenOrders.splice(idx, 1);
  writeDB(db);
  res.json(deleted[0]);
}; 