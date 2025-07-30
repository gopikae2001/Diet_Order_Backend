import { 
  getAllDietOrders, 
  getDietOrderById, 
  createDietOrder, 
  updateDietOrder, 
  deleteDietOrder 
} from './models/dietOrder.js';

async function testDietOrderOperations() {
  try {
    console.log('🧪 Testing DM_DietOrder operations...\n');

    // Test 1: Create a new diet order
    console.log('1️⃣ Creating a new diet order...');
    const newOrder = await createDietOrder({
      DO_patientName: 'Test Patient',
      DO_patientId: 'TEST001',
      DO_contactNumber: '9876543210',
      DO_age: '35 years',
      DO_bed: '101',
      DO_ward: 'General',
      DO_floor: '1st Floor',
      DO_doctor: 'Dr. Test',
      DO_dietPackage: 'Standard Diet',
      DO_packageRate: 75.50,
      DO_startDate: '2025-07-29',
      DO_endDate: '2025-08-05',
      DO_doctorNotes: 'Patient requires low sodium diet',
      DO_status: 'pending',
      DO_approvalStatus: 'pending',
      DO_dieticianInstructions: 'Monitor sodium intake',
      DO_gender: 'Male',
      DO_patientType: 'Inpatient',
      DO_email: 'test@example.com',
      DO_address: '123 Test Street',
      DO_bloodGroup: 'O+',
      DO_tokenNo: 'T001',
      DO_visitId: 'V001',
      DO_added_by: 'test-script',
      DO_outlet_fk: 'OUTLET001'
    });
    console.log('✅ Created diet order:', newOrder.DO_ID_PK);

    // Test 2: Get all diet orders
    console.log('\n2️⃣ Getting all diet orders...');
    const allOrders = await getAllDietOrders();
    console.log(`✅ Found ${allOrders.length} diet orders`);

    // Test 3: Get specific diet order by ID
    console.log('\n3️⃣ Getting diet order by ID...');
    const retrievedOrder = await getDietOrderById(newOrder.DO_ID_PK);
    console.log('✅ Retrieved order:', retrievedOrder.DO_patientName);

    // Test 4: Update diet order
    console.log('\n4️⃣ Updating diet order...');
    const updatedOrder = await updateDietOrder(newOrder.DO_ID_PK, {
      DO_status: 'approved',
      DO_approvalStatus: 'approved',
      DO_modified_by: 'test-script'
    });
    console.log('✅ Updated order status:', updatedOrder.DO_status);

    // Test 5: Delete diet order
    console.log('\n5️⃣ Deleting diet order...');
    const deleted = await deleteDietOrder(newOrder.DO_ID_PK);
    console.log('✅ Deleted order:', deleted ? 'Success' : 'Failed');

    console.log('\n🎉 All tests completed successfully!');

  } catch (err) {
    console.error('❌ Test failed:', err);
  }
}

// Run the test
testDietOrderOperations().then(() => {
  console.log('🏁 Test script finished');
  process.exit(0);
}).catch(err => {
  console.error('💥 Test script failed:', err);
  process.exit(1);
}); 