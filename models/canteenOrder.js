// CanteenOrder schema
const CanteenOrderSchema = {
  id: String,
  patientName: String,
  bed: String,
  ward: String,
  dietPackageName: String,
  dietType: String,
  foodItems: [String],
  specialNotes: String,
  status: String,
  prepared: Boolean,
  delivered: Boolean,
  dieticianInstructions: String,
  mealItems: Object,
};

module.exports = CanteenOrderSchema; 