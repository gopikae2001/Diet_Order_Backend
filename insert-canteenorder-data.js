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

async function insertCanteenOrderData() {
  try {
    console.log('🔄 Inserting sample data into DM_canteenOrder table...');
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
    
    // Check if data already exists
    const countQuery = `SELECT COUNT(*) as count FROM DM_canteenOrder`;
    const countResult = await pool.request().query(countQuery);
    const recordCount = countResult.recordset[0].count;
    
    if (recordCount > 0) {
      console.log(`📊 Table already has ${recordCount} records. Skipping data insertion.`);
    } else {
      console.log('📝 Table is empty. Inserting sample data...');
      
      const sampleData = [
        {
          CO_patient_id_fk: 1001,
          CO_patient_name: 'John Doe',
          CO_contact_number: 9876543210,
          CO_day: JSON.stringify(['Day 1', 'Day 2', 'Day 3']),
          CO_date: JSON.stringify(['2024-01-15', '2024-01-16', '2024-01-17']),
          CO_time: JSON.stringify(['08:00', '13:00', '19:00']),
          CO_category: JSON.stringify(['Breakfast', 'Lunch', 'Dinner']),
          CO_fooditem: JSON.stringify(['Idli', 'Rice and Dal', 'Chapati and Vegetables']),
          CO_price: JSON.stringify([50, 80, 60]),
          CO_intake_amount: JSON.stringify([2, 1.5, 2]),
          CO_status: 'pending',
          CO_added_by: 'admin',
          CO_provider_fk: 1,
          CO_outlet_fk: 'OUTLET001'
        },
        {
          CO_patient_id_fk: 1002,
          CO_patient_name: 'Jane Smith',
          CO_contact_number: 9876543211,
          CO_day: JSON.stringify(['Day 1', 'Day 2']),
          CO_date: JSON.stringify(['2024-01-15', '2024-01-16']),
          CO_time: JSON.stringify(['08:30', '13:30']),
          CO_category: JSON.stringify(['Breakfast', 'Lunch']),
          CO_fooditem: JSON.stringify(['Oatmeal', 'Grilled Chicken Salad']),
          CO_price: JSON.stringify([40, 120]),
          CO_intake_amount: JSON.stringify([1.5, 1]),
          CO_status: 'active',
          CO_added_by: 'admin',
          CO_provider_fk: 1,
          CO_outlet_fk: 'OUTLET001'
        },
        {
          CO_patient_id_fk: 1003,
          CO_patient_name: 'Mike Johnson',
          CO_contact_number: 9876543212,
          CO_day: JSON.stringify(['Day 1']),
          CO_date: JSON.stringify(['2024-01-15']),
          CO_time: JSON.stringify(['19:00']),
          CO_category: JSON.stringify(['Dinner']),
          CO_fooditem: JSON.stringify(['Chicken Breast with Vegetables']),
          CO_price: JSON.stringify([150]),
          CO_intake_amount: JSON.stringify([2.5]),
          CO_status: 'delivered',
          CO_added_by: 'admin',
          CO_provider_fk: 1,
          CO_outlet_fk: 'OUTLET001'
        }
      ];
      
      for (const data of sampleData) {
        const insertQuery = `
          INSERT INTO DM_canteenOrder (
            CO_patient_id_fk, CO_patient_name, CO_contact_number, CO_day, CO_date,
            CO_time, CO_category, CO_fooditem, CO_price, CO_intake_amount,
            CO_status, CO_added_by, CO_provider_fk, CO_outlet_fk
          ) VALUES (
            @patientIdFk, @patientName, @contactNumber, @day, @date,
            @time, @category, @fooditem, @price, @intakeAmount,
            @status, @addedBy, @providerFk, @outletFk
          )
        `;
        
        await pool.request()
          .input('patientIdFk', sql.BigInt, data.CO_patient_id_fk)
          .input('patientName', sql.VarChar(100), data.CO_patient_name)
          .input('contactNumber', sql.BigInt, data.CO_contact_number)
          .input('day', sql.NVarChar(sql.MAX), data.CO_day)
          .input('date', sql.NVarChar(sql.MAX), data.CO_date)
          .input('time', sql.NVarChar(sql.MAX), data.CO_time)
          .input('category', sql.NVarChar(sql.MAX), data.CO_category)
          .input('fooditem', sql.NVarChar(sql.MAX), data.CO_fooditem)
          .input('price', sql.NVarChar(sql.MAX), data.CO_price)
          .input('intakeAmount', sql.NVarChar(sql.MAX), data.CO_intake_amount)
          .input('status', sql.VarChar(50), data.CO_status)
          .input('addedBy', sql.VarChar(100), data.CO_added_by)
          .input('providerFk', sql.BigInt, data.CO_provider_fk)
          .input('outletFk', sql.VarChar(100), data.CO_outlet_fk)
          .query(insertQuery);
      }
      
      console.log('✅ Sample data inserted successfully');
    }
    
    // View all data in the table
    console.log('\n📋 All Data in DM_canteenOrder Table:');
    console.log('='.repeat(120));
    
    const selectQuery = `
      SELECT 
        CO_id,
        CO_patient_id_fk,
        CO_patient_name,
        CO_contact_number,
        CO_status,
        CO_added_on,
        CO_outlet_fk
      FROM DM_canteenOrder 
      ORDER BY CO_added_on DESC
    `;
    
    const result = await pool.request().query(selectQuery);
    
    if (result.recordset.length === 0) {
      console.log('❌ No data found in table');
    } else {
      console.log('ID'.padEnd(5) + 'Patient ID'.padEnd(12) + 'Patient Name'.padEnd(20) + 'Contact'.padEnd(15) + 'Status'.padEnd(12) + 'Added On'.padEnd(20) + 'Outlet');
      console.log('-'.repeat(120));
      
      result.recordset.forEach(row => {
        console.log(
          row.CO_id.toString().padEnd(5) +
          (row.CO_patient_id_fk || '').toString().padEnd(12) +
          (row.CO_patient_name || '').padEnd(20) +
          (row.CO_contact_number || '').toString().padEnd(15) +
          (row.CO_status || '').padEnd(12) +
          (row.CO_added_on ? row.CO_added_on.toLocaleString() : '').padEnd(20) +
          (row.CO_outlet_fk || '')
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
      console.log('ID:', firstRecord.CO_id);
      console.log('Patient ID FK:', firstRecord.CO_patient_id_fk);
      console.log('Patient Name:', firstRecord.CO_patient_name);
      console.log('Contact Number:', firstRecord.CO_contact_number);
      console.log('Status:', firstRecord.CO_status);
      console.log('Added On:', firstRecord.CO_added_on);
      console.log('Added By:', firstRecord.CO_added_by);
      console.log('Provider FK:', firstRecord.CO_provider_fk);
      console.log('Outlet FK:', firstRecord.CO_outlet_fk);
      console.log('Day:', firstRecord.CO_day);
      console.log('Date:', firstRecord.CO_date);
      console.log('Time:', firstRecord.CO_time);
      console.log('Category:', firstRecord.CO_category);
      console.log('Food Items:', firstRecord.CO_fooditem);
      console.log('Price:', firstRecord.CO_price);
      console.log('Intake Amount:', firstRecord.CO_intake_amount);
    }
    
    await pool.close();
    console.log('\n🔌 Database connection closed');
    
  } catch (err) {
    console.error('❌ Error inserting canteen order data:', err.message);
    console.error('🔍 Full error:', err);
  }
}

// Run the data insertion
insertCanteenOrderData().then(() => {
  console.log('🏁 Script finished');
  process.exit(0);
}).catch(err => {
  console.error('💥 Script failed:', err);
  process.exit(1);
}); 