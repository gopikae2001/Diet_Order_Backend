// import sql from 'mssql';
// import dotenv from 'dotenv';
// dotenv.config();

// const config = {
//   user: process.env.MSSQL_USER,
//   password: process.env.MSSQL_PASSWORD,
//   server: process.env.MSSQL_SERVER,
//   database: process.env.MSSQL_DATABASE,
//   pool: {
//     max: 10,
//     min: 0,
//     idleTimeoutMillis: 30000
//   },
//   options: {
//     encrypt: false,
//     trustServerCertificate: true,
//     enableArithAbort: true,
//     connectTimeout: 30000,
//     requestTimeout: 30000
//   },
//   connectionTimeout: 30000,
//   requestTimeout: 30000
// };



// // Test the database connection
// async function testConnection() {
//   try {
//     console.log('Testing database connection...');
//     const pool = await sql.connect(config);
//     const result = await pool.request().query('SELECT @@VERSION as version');
//     console.log('Database connection successful. SQL Server version:', result.recordset[0].version);
//     await pool.close();
//   } catch (err) {
//     console.error('Database connection test failed:', {
//       message: err.message,
//       code: err.code,
//       number: err.number,
//       state: err.state,
//       stack: err.stack
//     });
//     throw err;
//   }
// }

// // Function to create DietRequestApproval table if it doesn't exist
// export async function createDietRequestApprovalTable() {
//   const createTableSQL = `
//     IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='DietRequestApproval' AND xtype='U')
//     CREATE TABLE DietRequestApproval (
//       DRA_id BIGINT IDENTITY(1,1) PRIMARY KEY,
//       DRA_doctor_notes NVARCHAR(MAX), -- Doctor notes
//       DRA_status VARCHAR(20) NOT NULL DEFAULT 'pending', -- Status
//       DRA_approval BIT DEFAULT 0, -- Approval (1=approved, 0=rejected)
//       DRA_added_by VARCHAR(100), -- Person who approved the patient
//       DRA_added_on DATETIME2 DEFAULT GETDATE(), -- Approved time
//       DRA_provider_fk BIGINT,
//       DRA_outlet_fk NVARCHAR(100),
//       DRA_approved_by VARCHAR(100), -- Who approved patient
//       DRA_rejected_by VARCHAR(100), -- Who rejected patient
//       CONSTRAINT CK_DRA_status CHECK (DRA_status IN ('pending', 'approved', 'rejected')),
//       CONSTRAINT CK_DRA_approval CHECK (DRA_approval IN (0, 1))
//     );
//   `;

//   try {
//     const pool = await sql.connect(config);
//     await pool.request().query(createTableSQL);
//     console.log('DietRequestApproval table created or already exists.');
//     await pool.close();
//   } catch (err) {
//     console.error('Error creating DietRequestApproval table:', err.message);
//     throw err;
//   }
// }

// // Test the connection when this module is loaded
// // But don't block the application if it fails
// testConnection().catch(err => {
//     console.error('Initial database connection test failed:', err.message);
//   });

// // Create the DietRequestApproval table on startup (one-time)
// createDietRequestApprovalTable().catch(err => {
//   console.error('Table creation failed:', err.message);
// });



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

// Function to test DB connection
async function testConnection() {
  try {
    console.log('Testing database connection...');
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT @@VERSION as version');
    console.log('Database connected. SQL Server version:', result.recordset[0].version);
    await pool.close();
  } catch (err) {
    console.error('Connection test failed:', err);
    throw err;
  }
}

async function createDietRequestApprovalTable() {
    try {
      const pool = await sql.connect(config);
  
      console.log("Connected to:", process.env.MSSQL_DATABASE);
  
      const query = `
        IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'dietRequestApproval')
        BEGIN
          CREATE TABLE dietRequestApproval (
            DRA_id_pk BIGINT IDENTITY(1,1) PRIMARY KEY,
            DRA_patient_id_fk BIGINT NOT NULL,
            DRA_doctor_id_fk BIGINT NOT NULL,
            DRA_doctor_notes NVARCHAR(MAX),
            DRA_status VARCHAR(20) CHECK (DRA_status IN ('pending', 'approved', 'rejected')),
            DRA_approval INT CHECK (DRA_approval IN (0, 10)),
            DRA_added_by VARCHAR(100),
            DRA_added_on DATETIME,
            DRA_provider_fk BIGINT,
            DRA_outlet_fk NVARCHAR(100),
            DRA_approved_by VARCHAR(100),
            DRA_rejected_by VARCHAR(100),
            CONSTRAINT FK_Patient FOREIGN KEY (DRA_patient_id_fk) REFERENCES hodo_patient_registration(patient_id),
            CONSTRAINT FK_Doctor FOREIGN KEY (DRA_doctor_id_fk) REFERENCES hodo_doctor(doctor_id)
          );
          PRINT 'Table created';
        END
        ELSE
        BEGIN
          PRINT 'Table already exists';
        END
      `;
  
      const result = await pool.request().query(query);
      console.log("Table creation query executed.");
      await pool.close();
    } catch (err) {
      console.error("❌ Failed to create table:", err.message);
    }
  }

async function createFoodItemTable() {
  try {
    const pool = await sql.connect(config);
    console.log("Connected to:", process.env.MSSQL_DATABASE);
    const query = `
      IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'DM_foodItem')
      BEGIN
        CREATE TABLE DM_foodItem (
          FI_ID_PK        BIGINT IDENTITY(1,1) PRIMARY KEY,
          FI_name         VARCHAR(255)      NOT NULL,
          FI_foodType     VARCHAR(50),
          FI_category     VARCHAR(100),
          FI_unit         VARCHAR(100),
          FI_quantity     DECIMAL(18,2),
          FI_price        DECIMAL(18,2),
          FI_priceperunit DECIMAL(18,2),
          FI_added_by     VARCHAR(100),
          FI_added_on     DATETIME DEFAULT GETDATE(),
          FI_modified_by  VARCHAR(100),
          FI_modified_on  DATETIME,
          DRA_outlet_fk   VARCHAR(100)
        );
        PRINT 'DM_foodItem table created';
      END
      ELSE
      BEGIN
        PRINT 'DM_foodItem table already exists';
      END
    `;
    await pool.request().query(query);
    console.log("DM_foodItem table creation query executed.");
    await pool.close();
  } catch (err) {
    console.error("❌ Failed to create DM_foodItem table:", err.message);
  }
}
  
// Call test and create functions
testConnection().then(() => {
  createDietRequestApprovalTable();
  createFoodItemTable();
});
