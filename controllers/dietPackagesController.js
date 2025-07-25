// dietPackages controller
exports.getAll = (req, res) => res.send('Get all diet packages');
exports.getById = (req, res) => res.send(`Get diet package ${req.params.id}`);
exports.create = (req, res) => res.send('Create diet package');
exports.update = (req, res) => res.send(`Update diet package ${req.params.id}`);
exports.delete = (req, res) => res.send(`Delete diet package ${req.params.id}`); 