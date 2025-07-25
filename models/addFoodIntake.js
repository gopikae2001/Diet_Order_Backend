// AddFoodIntake schema
const AddFoodIntakeSchema = {
  id: String,
  patientId: String,
  foodItemId: String,
  quantity: Number,
  time: String,
  date: String,
  notes: String,
};

module.exports = AddFoodIntakeSchema; 