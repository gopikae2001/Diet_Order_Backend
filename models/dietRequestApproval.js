// DietRequestApproval schema
const DietRequestApprovalSchema = {
  id: String,
  requestId: String,
  approvedBy: String,
  approvalStatus: String,
  approvalDate: String,
  notes: String,
};

module.exports = DietRequestApprovalSchema; 