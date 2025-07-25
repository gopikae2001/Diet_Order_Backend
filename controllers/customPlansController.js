// customPlans controller
exports.getAll = (req, res) => res.send('Get all custom plans');
exports.getById = (req, res) => res.send(`Get custom plan ${req.params.id}`);
exports.create = (req, res) => res.send('Create custom plan');
exports.update = (req, res) => res.send(`Update custom plan ${req.params.id}`);
exports.delete = (req, res) => res.send(`Delete custom plan ${req.params.id}`); 