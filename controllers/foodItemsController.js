// foodItems controller
exports.getAll = (req, res) => res.send('Get all food items');
exports.getById = (req, res) => res.send(`Get food item ${req.params.id}`);
exports.create = (req, res) => res.send('Create food item');
exports.update = (req, res) => res.send(`Update food item ${req.params.id}`);
exports.delete = (req, res) => res.send(`Delete food item ${req.params.id}`); 