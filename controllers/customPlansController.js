// customPlans controller
export const getAll = (req, res) => res.send('Get all custom plans');
export const getById = (req, res) => res.send(`Get custom plan ${req.params.id}`);
export const create = (req, res) => res.send('Create custom plan');
export const update = (req, res) => res.send(`Update custom plan ${req.params.id}`);
export const deletePlan = (req, res) => res.send(`Delete custom plan ${req.params.id}`); 