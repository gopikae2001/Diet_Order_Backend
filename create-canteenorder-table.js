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

async function createCanteenOrderTable() {
  try {
    console.log('🔄 Creating DM_canteenOrder table...');
    console.log('📊 Database:', process.env.MSSQL_DATABASE);
    console.log('🔗 Server:', process.env.MSSQL_SERVER);
    
    const pool = await sql.connect(config);
    console.log('✅ Connected to database successfully');
    
    const query = `
      IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'DM_canteenOrder')
      BEGIN
        CREATE TABLE DM_canteenOrder (
          CO_id                    BIGINT IDENTITY(1,1) PRIMARY KEY,
          CO_patient_id_fk         BIGINT,
          CO_patient_name          VARCHAR(100),
          CO_contact_number        BIGINT,
          CO_day                   NVARCHAR(MAX),
          CO_date                  NVARCHAR(MAX),
          CO_time                  NVARCHAR(MAX),
          CO_category              NVARCHAR(MAX),
          CO_fooditem              NVARCHAR(MAX),
          CO_price                 NVARCHAR(MAX),
          CO_intake_amount         NVARCHAR(MAX),
          CO_status                VARCHAR(50) DEFAULT 'pending',
          CO_added_on              DATETIME DEFAULT GETDATE(),
          CO_added_by              VARCHAR(100),
          CO_modified_on           DATETIME,
          CO_modified_by           VARCHAR(100),
          CO_provider_fk           BIGINT,
          CO_outlet_fk             VARCHAR(100),
          CONSTRAINT CK_CO_status CHECK (CO_status IN ('pending', 'active', 'delivered'))
        );
        PRINT 'DM_canteenOrder table created successfully';
      END
      ELSE
      BEGIN
        PRINT 'DM_canteenOrder table already exists';
      END
    `;
    
    const result = await pool.request().query(query);
    console.log('✅ Table creation query executed successfully');
    
    // Verify table exists
    const verifyQuery = `
      SELECT TABLE_NAME 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_NAME = 'DM_canteenOrder'
    `;
    const verifyResult = await pool.request().query(verifyQuery);
    
    if (verifyResult.recordset.length > 0) {
      console.log('✅ DM_canteenOrder table exists in database');
      
      // Show table structure
      const structureQuery = `
        SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_DEFAULT
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_NAME = 'DM_canteenOrder'
        ORDER BY ORDINAL_POSITION
      `;
      const structureResult = await pool.request().query(structureQuery);
      
      console.log('\n📋 Table Structure:');
      console.log('Column Name'.padEnd(25) + 'Data Type'.padEnd(15) + 'Nullable'.padEnd(10) + 'Default');
      console.log('-'.repeat(60));
      
      structureResult.recordset.forEach(col => {
        console.log(
          col.COLUMN_NAME.padEnd(25) + 
          col.DATA_TYPE.padEnd(15) + 
          col.IS_NULLABLE.padEnd(10) + 
          (col.COLUMN_DEFAULT || 'NULL')
        );
      });
    } else {
      console.log('❌ DM_canteenOrder table was not created');
    }
    
    await pool.close();
    console.log('🔌 Database connection closed');
    
  } catch (err) {
    console.error('❌ Error creating DM_canteenOrder table:', err.message);
    console.error('🔍 Full error:', err);
  }
}

// Run the table creation
createCanteenOrderTable().then(() => {
  console.log('🏁 Script finished');
  process.exit(0);
}).catch(err => {
  console.error('💥 Script failed:', err);
  process.exit(1);
}); 