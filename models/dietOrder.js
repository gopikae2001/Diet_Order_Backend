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

// Get all diet orders
export const getAllDietOrders = async () => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`
      SELECT 
        DO_ID_PK,
        DO_patientName,
        DO_patientId,
        DO_contactNumber,
        DO_age,
        DO_bed,
        DO_ward,
        DO_floor,
        DO_doctor,
        DO_dietPackage,
        DO_packageRate,
        DO_startDate,
        DO_endDate,
        DO_doctorNotes,
        DO_status,
        DO_approvalStatus,
        DO_dieticianInstructions,
        DO_gender,
        DO_patientType,
        DO_email,
        DO_address,
        DO_bloodGroup,
        DO_tokenNo,
        DO_visitId,
        DO_added_by,
        DO_added_on,
        DO_modified_by,
        DO_modified_on,
        DO_outlet_fk
      FROM DM_DietOrder
      ORDER BY DO_added_on DESC
    `);
    await pool.close();
    return result.recordset;
  } catch (err) {
    console.error('Error getting all diet orders:', err);
    throw err;
  }
};

// Get diet order by ID
export const getDietOrderById = async (id) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('id', sql.BigInt, id)
      .query(`
        SELECT * FROM DM_DietOrder 
        WHERE DO_ID_PK = @id
      `);
    await pool.close();
    return result.recordset[0];
  } catch (err) {
    console.error('Error getting diet order by ID:', err);
    throw err;
  }
};

// Create new diet order
export const createDietOrder = async (dietOrderData) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('patientName', sql.VarChar(255), dietOrderData.DO_patientName)
      .input('patientId', sql.VarChar(100), dietOrderData.DO_patientId)
      .input('contactNumber', sql.VarChar(20), dietOrderData.DO_contactNumber)
      .input('age', sql.VarChar(10), dietOrderData.DO_age)
      .input('bed', sql.VarChar(50), dietOrderData.DO_bed)
      .input('ward', sql.VarChar(100), dietOrderData.DO_ward)
      .input('floor', sql.VarChar(50), dietOrderData.DO_floor)
      .input('doctor', sql.VarChar(255), dietOrderData.DO_doctor)
      .input('dietPackage', sql.VarChar(255), dietOrderData.DO_dietPackage)
      .input('packageRate', sql.Decimal(18,2), dietOrderData.DO_packageRate)
      .input('startDate', sql.Date, dietOrderData.DO_startDate)
      .input('endDate', sql.Date, dietOrderData.DO_endDate)
      .input('doctorNotes', sql.NVarChar(sql.MAX), dietOrderData.DO_doctorNotes)
      .input('status', sql.VarChar(50), dietOrderData.DO_status || 'pending')
      .input('approvalStatus', sql.VarChar(50), dietOrderData.DO_approvalStatus || 'pending')
      .input('dieticianInstructions', sql.NVarChar(sql.MAX), dietOrderData.DO_dieticianInstructions)
      .input('gender', sql.VarChar(10), dietOrderData.DO_gender)
      .input('patientType', sql.VarChar(50), dietOrderData.DO_patientType)
      .input('email', sql.VarChar(255), dietOrderData.DO_email)
      .input('address', sql.NVarChar(sql.MAX), dietOrderData.DO_address)
      .input('bloodGroup', sql.VarChar(10), dietOrderData.DO_bloodGroup)
      .input('tokenNo', sql.VarChar(50), dietOrderData.DO_tokenNo)
      .input('visitId', sql.VarChar(100), dietOrderData.DO_visitId)
      .input('addedBy', sql.VarChar(100), dietOrderData.DO_added_by)
      .input('outletFk', sql.VarChar(100), dietOrderData.DO_outlet_fk)
      .query(`
        INSERT INTO DM_DietOrder (
          DO_patientName, DO_patientId, DO_contactNumber, DO_age, DO_bed,
          DO_ward, DO_floor, DO_doctor, DO_dietPackage, DO_packageRate,
          DO_startDate, DO_endDate, DO_doctorNotes, DO_status, DO_approvalStatus,
          DO_dieticianInstructions, DO_gender, DO_patientType, DO_email,
          DO_address, DO_bloodGroup, DO_tokenNo, DO_visitId, DO_added_by, DO_outlet_fk
        )
        VALUES (
          @patientName, @patientId, @contactNumber, @age, @bed,
          @ward, @floor, @doctor, @dietPackage, @packageRate,
          @startDate, @endDate, @doctorNotes, @status, @approvalStatus,
          @dieticianInstructions, @gender, @patientType, @email,
          @address, @bloodGroup, @tokenNo, @visitId, @addedBy, @outletFk
        );
        SELECT SCOPE_IDENTITY() as DO_ID_PK;
      `);
    
    const newId = result.recordset[0].DO_ID_PK;
    await pool.close();
    
    // Return the created order
    return await getDietOrderById(newId);
  } catch (err) {
    console.error('Error creating diet order:', err);
    throw err;
  }
};

// Update diet order
export const updateDietOrder = async (id, dietOrderData) => {
  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input('id', sql.BigInt, id)
      .input('patientName', sql.VarChar(255), dietOrderData.DO_patientName)
      .input('patientId', sql.VarChar(100), dietOrderData.DO_patientId)
      .input('contactNumber', sql.VarChar(20), dietOrderData.DO_contactNumber)
      .input('age', sql.VarChar(10), dietOrderData.DO_age)
      .input('bed', sql.VarChar(50), dietOrderData.DO_bed)
      .input('ward', sql.VarChar(100), dietOrderData.DO_ward)
      .input('floor', sql.VarChar(50), dietOrderData.DO_floor)
      .input('doctor', sql.VarChar(255), dietOrderData.DO_doctor)
      .input('dietPackage', sql.VarChar(255), dietOrderData.DO_dietPackage)
      .input('packageRate', sql.Decimal(18,2), dietOrderData.DO_packageRate)
      .input('startDate', sql.Date, dietOrderData.DO_startDate)
      .input('endDate', sql.Date, dietOrderData.DO_endDate)
      .input('doctorNotes', sql.NVarChar(sql.MAX), dietOrderData.DO_doctorNotes)
      .input('status', sql.VarChar(50), dietOrderData.DO_status)
      .input('approvalStatus', sql.VarChar(50), dietOrderData.DO_approvalStatus)
      .input('dieticianInstructions', sql.NVarChar(sql.MAX), dietOrderData.DO_dieticianInstructions)
      .input('gender', sql.VarChar(10), dietOrderData.DO_gender)
      .input('patientType', sql.VarChar(50), dietOrderData.DO_patientType)
      .input('email', sql.VarChar(255), dietOrderData.DO_email)
      .input('address', sql.NVarChar(sql.MAX), dietOrderData.DO_address)
      .input('bloodGroup', sql.VarChar(10), dietOrderData.DO_bloodGroup)
      .input('tokenNo', sql.VarChar(50), dietOrderData.DO_tokenNo)
      .input('visitId', sql.VarChar(100), dietOrderData.DO_visitId)
      .input('modifiedBy', sql.VarChar(100), dietOrderData.DO_modified_by)
      .input('outletFk', sql.VarChar(100), dietOrderData.DO_outlet_fk)
      .query(`
        UPDATE DM_DietOrder SET
          DO_patientName = @patientName,
          DO_patientId = @patientId,
          DO_contactNumber = @contactNumber,
          DO_age = @age,
          DO_bed = @bed,
          DO_ward = @ward,
          DO_floor = @floor,
          DO_doctor = @doctor,
          DO_dietPackage = @dietPackage,
          DO_packageRate = @packageRate,
          DO_startDate = @startDate,
          DO_endDate = @endDate,
          DO_doctorNotes = @doctorNotes,
          DO_status = @status,
          DO_approvalStatus = @approvalStatus,
          DO_dieticianInstructions = @dieticianInstructions,
          DO_gender = @gender,
          DO_patientType = @patientType,
          DO_email = @email,
          DO_address = @address,
          DO_bloodGroup = @bloodGroup,
          DO_tokenNo = @tokenNo,
          DO_visitId = @visitId,
          DO_modified_by = @modifiedBy,
          DO_modified_on = GETDATE(),
          DO_outlet_fk = @outletFk
        WHERE DO_ID_PK = @id
      `);
    
    await pool.close();
    
    // Return the updated order
    return await getDietOrderById(id);
  } catch (err) {
    console.error('Error updating diet order:', err);
    throw err;
  }
};

// Delete diet order
export const deleteDietOrder = async (id) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('id', sql.BigInt, id)
      .query(`
        DELETE FROM DM_DietOrder 
        WHERE DO_ID_PK = @id
      `);
    await pool.close();
    return result.rowsAffected[0] > 0;
  } catch (err) {
    console.error('Error deleting diet order:', err);
    throw err;
  }
}; 