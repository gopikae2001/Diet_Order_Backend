import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createDietOrder } from './models/dietOrder.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrateDietOrders() {
  try {
    console.log('🔄 Starting diet orders migration...');
    
    // Read the JSON file
    const dbPath = path.join(__dirname, 'db.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    
    if (!dbData.dietOrders || !Array.isArray(dbData.dietOrders)) {
      console.log('❌ No diet orders found in db.json');
      return;
    }
    
    console.log(`📊 Found ${dbData.dietOrders.length} diet orders to migrate`);
    
    let successCount = 0;
    let errorCount = 0;
    
    for (const order of dbData.dietOrders) {
      try {
        // Map the old JSON structure to new MSSQL structure
        const mappedOrder = {
          DO_patientName: order.patientName || '',
          DO_patientId: order.patientId || '',
          DO_contactNumber: order.contactNumber || '',
          DO_age: order.age || '',
          DO_bed: order.bed || '',
          DO_ward: order.ward || '',
          DO_floor: order.floor || '',
          DO_doctor: order.doctor || '',
          DO_dietPackage: order.dietPackage || '',
          DO_packageRate: parseFloat(order.packageRate) || 0,
          DO_startDate: order.startDate || null,
          DO_endDate: order.endDate || null,
          DO_doctorNotes: order.doctorNotes || '',
          DO_status: order.status || 'pending',
          DO_approvalStatus: order.approvalStatus || 'pending',
          DO_dieticianInstructions: order.dieticianInstructions || '',
          DO_gender: order.gender || '',
          DO_patientType: order.patientType || '',
          DO_email: order.email || '',
          DO_address: order.address || '',
          DO_bloodGroup: order.bloodGroup || '',
          DO_tokenNo: order.tokenNo || '',
          DO_visitId: order.visitId || '',
          DO_added_by: 'migration',
          DO_outlet_fk: 'OUTLET001'
        };
        
        // Create the order in MSSQL
        const newOrder = await createDietOrder(mappedOrder);
        console.log(`✅ Migrated diet order: ${newOrder.DO_patientName} (ID: ${newOrder.DO_ID_PK})`);
        successCount++;
        
      } catch (err) {
        console.error(`❌ Failed to migrate diet order:`, err.message);
        errorCount++;
      }
    }
    
    console.log(`\n📈 Migration completed:`);
    console.log(`✅ Successfully migrated: ${successCount} orders`);
    console.log(`❌ Failed to migrate: ${errorCount} orders`);
    
  } catch (err) {
    console.error('❌ Migration failed:', err);
  }
}

// Run the migration
migrateDietOrders().then(() => {
  console.log('🏁 Migration script finished');
  process.exit(0);
}).catch(err => {
  console.error('💥 Migration script failed:', err);
  process.exit(1);
}); 