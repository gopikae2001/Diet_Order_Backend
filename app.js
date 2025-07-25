const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const app = express();

app.use(express.json());

// Import routes
app.use('/dietOrders', require('./routes/dietOrders'));
app.use('/dietPackages', require('./routes/dietPackages'));
app.use('/dietRequests', require('./routes/dietRequests'));
app.use('/foodItems', require('./routes/foodItems'));
app.use('/canteenOrders', require('./routes/canteenOrders'));
app.use('/customPlans', require('./routes/customPlans'));
app.use('/AddFoodIntake', require('./routes/addFoodIntake'));
app.use('/Diet Request approval', require('./routes/dietRequestApproval'));

// Swagger setup
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Diet Management API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/**/*.js'],
};
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 