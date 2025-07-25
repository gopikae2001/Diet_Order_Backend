// DietOrder schema
const DietOrderSchema = {
  id: String,
  patientName: String,
  patientId: String,
  contactNumber: String,
  age: String,
  bed: String,
  ward: String,
  floor: String,
  doctor: String,
  dietPackage: String,
  packageRate: String,
  startDate: String,
  endDate: String,
  doctorNotes: String,
  status: String,
  approvalStatus: String,
  dieticianInstructions: String,
  gender: String,
  patientType: String,
  email: String,
  address: String,
  bloodGroup: String,
  tokenNo: String,
  visitId: String,
};

module.exports = DietOrderSchema; 