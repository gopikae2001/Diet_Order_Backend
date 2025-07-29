import sql from 'mssql';
import dotenv from 'dotenv';
dotenv.config();

const config = {
  user: process.env.MSSQL_USER,
  password: process.env.MSSQL_PASSWORD,
  server: process.env.MSSQL_SERVER,
  database: process.env.MSSQL_DATABASE,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true,
    connectTimeout: 30000,
    requestTimeout: 30000
  },
  connectionTimeout: 30000,
  requestTimeout: 30000
};

async function testConnection() {
  try {
    console.log('🔌 Testing SQL Server connection...');
    console.log('Database:', config.database);
    console.log('Server:', config.server);
    
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT @@VERSION as version');
    console.log('✅ Database connection successful!');
    console.log('SQL Server version:', result.recordset[0].version);
    await pool.close();
    return true;
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    return false;
  }
}

async function testTableCreation() {
  try {
    console.log('\n📋 Testing table creation...');
    const pool = await sql.connect(config);
    
    // Check if table exists
    const tableCheck = await pool.request()
      .query("SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'DietRequestApproval'");
    
    if (tableCheck.recordset.length > 0) {
      console.log('✅ DietRequestApproval table already exists');
    } else {
      console.log('📝 Creating DietRequestApproval table...');
      
      const createTableSQL = `
        CREATE TABLE DietRequestApproval (
          DRA_id BIGINT IDENTITY(1,1) PRIMARY KEY,
          DRA_doctor_notes NVARCHAR(MAX),
          DRA_status VARCHAR(20) NOT NULL DEFAULT 'pending',
          DRA_approval BIT DEFAULT 0,
          DRA_added_by VARCHAR(100),
          DRA_added_on DATETIME2 DEFAULT GETDATE(),
          DRA_provider_fk BIGINT,
          DRA_outlet_fk NVARCHAR(100),
          DRA_approved_by VARCHAR(100),
          DRA_rejected_by VARCHAR(100),
          CONSTRAINT CK_DRA_status CHECK (DRA_status IN ('pending', 'approved', 'rejected')),
          CONSTRAINT CK_DRA_approval CHECK (DRA_approval IN (0, 1))
        );
      `;
      
      await pool.request().query(createTableSQL);
      console.log('✅ DietRequestApproval table created successfully!');
    }
    
    await pool.close();
    return true;
  } catch (err) {
    console.error('❌ Table creation failed:', err.message);
    return false;
  }
}

async function testDataOperations() {
  try {
    console.log('\n📊 Testing data operations...');
    const pool = await sql.connect(config);
    
    // Test INSERT
    console.log('📝 Testing INSERT...');
    const insertResult = await pool.request()
      .input('doctor_notes', sql.NVarChar, 'Test patient needs low-sodium diet')
      .input('status', sql.VarChar(20), 'pending')
      .input('approval', sql.Bit, 0)
      .input('added_by', sql.VarChar(100), 'Test Doctor')
      .input('provider_fk', sql.BigInt, 1)
      .input('outlet_fk', sql.NVarChar(100), 'TEST001')
      .query(`
        INSERT INTO DietRequestApproval (
          DRA_doctor_notes, DRA_status, DRA_approval, DRA_added_by,
          DRA_provider_fk, DRA_outlet_fk
        )
        OUTPUT INSERTED.*
        VALUES (
          @doctor_notes, @status, @approval, @added_by,
          @provider_fk, @outlet_fk
        )
      `);
    
    console.log('✅ INSERT successful:', insertResult.recordset[0]);
    
    // Test SELECT
    console.log('📖 Testing SELECT...');
    const selectResult = await pool.request()
      .query('SELECT * FROM DietRequestApproval ORDER BY DRA_added_on DESC');
    
    console.log('✅ SELECT successful. Found', selectResult.recordset.length, 'records');
    
    // Test UPDATE
    console.log('✏️ Testing UPDATE...');
    const updateResult = await pool.request()
      .input('id', sql.BigInt, insertResult.recordset[0].DRA_id)
      .input('approved_by', sql.VarChar(100), 'Dr. Smith')
      .query(`
        UPDATE DietRequestApproval 
        SET DRA_status = 'approved',
            DRA_approval = 1,
            DRA_approved_by = @approved_by
        WHERE DRA_id = @id;
        
        SELECT * FROM DietRequestApproval WHERE DRA_id = @id;
      `);
    
    console.log('✅ UPDATE successful:', updateResult.recordset[0]);
    
    await pool.close();
    return true;
  } catch (err) {
    console.error('❌ Data operations failed:', err.message);
    return false;
  }
}

async function runTests() {
  console.log('🧪 Starting SQL Server Tests...\n');
  
  const connectionOk = await testConnection();
  if (!connectionOk) {
    console.log('\n❌ Connection failed. Please check your .env file and SQL Server settings.');
    return;
  }
  
  const tableOk = await testTableCreation();
  if (!tableOk) {
    console.log('\n❌ Table creation failed.');
    return;
  }
  
  const dataOk = await testDataOperations();
  if (!dataOk) {
    console.log('\n❌ Data operations failed.');
    return;
  }
  
  console.log('\n🎉 All tests passed! Your SQL Server setup is working correctly.');
  console.log('\n📋 Next steps:');
  console.log('1. Start your backend server: npm start');
  console.log('2. Test the API endpoints');
  console.log('3. Check Swagger docs at: http://localhost:3001/api-docs');
}

runTests().catch(err => {
  console.error('Test runner failed:', err);
}); 