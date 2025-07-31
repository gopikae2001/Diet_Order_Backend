import sql from 'mssql';
import dotenv from 'dotenv';
dotenv.config();

const config = {
  user: process.env.MSSQL_USER,
  password: process.env.MSSQL_PASSWORD,
  server: process.env.MSSQL_SERVER,
  database: process.env.MSSQL_DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true
  }
};

async function viewCanteenOrderData() {
  try {
    console.log('🔍 Viewing DM_canteenOrder table data...');
    console.log('📊 Database:', process.env.MSSQL_DATABASE);
    
    const pool = await sql.connect(config);
    console.log('✅ Connected to database successfully');
    
    // Check if table exists
    const tableExistsQuery = `
      SELECT TABLE_NAME 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_NAME = 'DM_canteenOrder'
    `;
    const tableExistsResult = await pool.request().query(tableExistsQuery);
    
    if (tableExistsResult.recordset.length === 0) {
      console.log('❌ DM_canteenOrder table does not exist. Please create it first.');
      await pool.close();
      return;
    }
    
    console.log('✅ DM_canteenOrder table exists');
    
    // Insert sample data if table is empty
    const countQuery = `SELECT COUNT(*) as count FROM DM_canteenOrder`;
    const countResult = await pool.request().query(countQuery);
    const recordCount = countResult.recordset[0].count;
    
    if (recordCount === 0) {
      console.log('📝 Table is empty. Inserting sample data...');
      
      const sampleData = [
        {
          CO_patientName: 'John Doe',
          CO_bed: '101',
          CO_ward: 'General',
          CO_dietPackageName: 'Standard Diet',
          CO_dietType: 'Vegetarian',
          CO_foodItems: JSON.stringify(['Rice', 'Dal', 'Vegetables']),
          CO_specialNotes: 'Patient prefers less spicy food',
          CO_status: 'pending',
          CO_prepared: false,
          CO_delivered: false,
          CO_dieticianInstructions: 'Monitor sodium intake',
          CO_mealItems: JSON.stringify({
            breakfast: [
              {
                foodItemId: '1',
                foodItemName: 'Idli',
                quantity: 2,
                unit: 'pieces'
              }
            ]
          }),
          CO_added_by: 'admin',
          CO_outlet_fk: 'OUTLET001'
        },
        {
          CO_patientName: 'Jane Smith',
          CO_bed: '102',
          CO_ward: 'Cardiology',
          CO_dietPackageName: 'Low Sodium Diet',
          CO_dietType: 'Diabetic',
          CO_foodItems: JSON.stringify(['Brown Rice', 'Grilled Chicken', 'Steamed Vegetables']),
          CO_specialNotes: 'Patient has diabetes and hypertension',
          CO_status: 'prepared',
          CO_prepared: true,
          CO_delivered: false,
          CO_dieticianInstructions: 'Low sodium, low sugar diet',
          CO_mealItems: JSON.stringify({
            lunch: [
              {
                foodItemId: '2',
                foodItemName: 'Brown Rice',
                quantity: 1,
                unit: 'cup'
              }
            ]
          }),
          CO_added_by: 'admin',
          CO_outlet_fk: 'OUTLET001'
        }
      ];
      
      for (const data of sampleData) {
        const insertQuery = `
          INSERT INTO DM_canteenOrder (
            CO_patientName, CO_bed, CO_ward, CO_dietPackageName, CO_dietType,
            CO_foodItems, CO_specialNotes, CO_status, CO_prepared, CO_delivered,
            CO_dieticianInstructions, CO_mealItems, CO_added_by, CO_outlet_fk
          ) VALUES (
            @patientName, @bed, @ward, @dietPackageName, @dietType,
            @foodItems, @specialNotes, @status, @prepared, @delivered,
            @dieticianInstructions, @mealItems, @addedBy, @outletFk
          )
        `;
        
        await pool.request()
          .input('patientName', sql.VarChar(255), data.CO_patientName)
          .input('bed', sql.VarChar(50), data.CO_bed)
          .input('ward', sql.VarChar(100), data.CO_ward)
          .input('dietPackageName', sql.VarChar(255), data.CO_dietPackageName)
          .input('dietType', sql.VarChar(100), data.CO_dietType)
          .input('foodItems', sql.NVarChar(sql.MAX), data.CO_foodItems)
          .input('specialNotes', sql.NVarChar(sql.MAX), data.CO_specialNotes)
          .input('status', sql.VarChar(50), data.CO_status)
          .input('prepared', sql.Bit, data.CO_prepared)
          .input('delivered', sql.Bit, data.CO_delivered)
          .input('dieticianInstructions', sql.NVarChar(sql.MAX), data.CO_dieticianInstructions)
          .input('mealItems', sql.NVarChar(sql.MAX), data.CO_mealItems)
          .input('addedBy', sql.VarChar(100), data.CO_added_by)
          .input('outletFk', sql.VarChar(100), data.CO_outlet_fk)
          .query(insertQuery);
      }
      
      console.log('✅ Sample data inserted successfully');
    } else {
      console.log(`📊 Table has ${recordCount} existing records`);
    }
    
    // View all data in the table
    console.log('\n📋 All Data in DM_canteenOrder Table:');
    console.log('='.repeat(100));
    
    const selectQuery = `
      SELECT 
        CO_ID_PK,
        CO_patientName,
        CO_bed,
        CO_ward,
        CO_dietPackageName,
        CO_dietType,
        CO_status,
        CO_prepared,
        CO_delivered,
        CO_added_on,
        CO_outlet_fk
      FROM DM_canteenOrder 
      ORDER BY CO_added_on DESC
    `;
    
    const result = await pool.request().query(selectQuery);
    
    if (result.recordset.length === 0) {
      console.log('❌ No data found in table');
    } else {
      console.log('ID'.padEnd(5) + 'Patient Name'.padEnd(20) + 'Bed'.padEnd(8) + 'Ward'.padEnd(15) + 'Package'.padEnd(15) + 'Type'.padEnd(12) + 'Status'.padEnd(10) + 'Prepared'.padEnd(10) + 'Delivered'.padEnd(10) + 'Added On');
      console.log('-'.repeat(100));
      
      result.recordset.forEach(row => {
        console.log(
          row.CO_ID_PK.toString().padEnd(5) +
          (row.CO_patientName || '').padEnd(20) +
          (row.CO_bed || '').padEnd(8) +
          (row.CO_ward || '').padEnd(15) +
          (row.CO_dietPackageName || '').padEnd(15) +
          (row.CO_dietType || '').padEnd(12) +
          (row.CO_status || '').padEnd(10) +
          (row.CO_prepared ? 'Yes' : 'No').padEnd(10) +
          (row.CO_delivered ? 'Yes' : 'No').padEnd(10) +
          (row.CO_added_on ? row.CO_added_on.toLocaleString() : '')
        );
      });
    }
    
    // Show detailed view of first record
    console.log('\n🔍 Detailed View of First Record:');
    console.log('='.repeat(50));
    
    const detailQuery = `
      SELECT * FROM DM_canteenOrder 
      ORDER BY CO_added_on DESC
    `;
    
    const detailResult = await pool.request().query(detailQuery);
    
    if (detailResult.recordset.length > 0) {
      const firstRecord = detailResult.recordset[0];
      console.log('ID:', firstRecord.CO_ID_PK);
      console.log('Patient Name:', firstRecord.CO_patientName);
      console.log('Bed:', firstRecord.CO_bed);
      console.log('Ward:', firstRecord.CO_ward);
      console.log('Diet Package:', firstRecord.CO_dietPackageName);
      console.log('Diet Type:', firstRecord.CO_dietType);
      console.log('Status:', firstRecord.CO_status);
      console.log('Prepared:', firstRecord.CO_prepared ? 'Yes' : 'No');
      console.log('Delivered:', firstRecord.CO_delivered ? 'Yes' : 'No');
      console.log('Added On:', firstRecord.CO_added_on);
      console.log('Food Items:', firstRecord.CO_foodItems);
      console.log('Special Notes:', firstRecord.CO_specialNotes);
      console.log('Dietician Instructions:', firstRecord.CO_dieticianInstructions);
    }
    
    await pool.close();
    console.log('\n🔌 Database connection closed');
    
  } catch (err) {
    console.error('❌ Error viewing canteen order data:', err.message);
    console.error('🔍 Full error:', err);
  }
}

// Run the data viewing
viewCanteenOrderData().then(() => {
  console.log('🏁 Script finished');
  process.exit(0);
}).catch(err => {
  console.error('💥 Script failed:', err);
  process.exit(1);
}); 