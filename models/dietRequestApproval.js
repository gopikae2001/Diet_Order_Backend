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

class DietRequestApprovalModel {
  // Get all diet request approvals
  static async getAll() {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request()
        .query('SELECT * FROM DietRequestApproval ORDER BY DRA_added_on DESC');
      await pool.close();
      return result.recordset;
    } catch (error) {
      console.error('Error getting diet request approvals:', error);
      throw error;
    }
  }

  // Get diet request approval by ID
  static async getById(id) {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request()
        .input('id', sql.BigInt, id)
        .query('SELECT * FROM DietRequestApproval WHERE DRA_id = @id');
      await pool.close();
      return result.recordset[0];
    } catch (error) {
      console.error('Error getting diet request approval by ID:', error);
      throw error;
    }
  }

  // Create new diet request approval
  static async create(draData) {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request()
        .input('doctor_notes', sql.NVarChar, draData.DRA_doctor_notes)
        .input('status', sql.VarChar(20), draData.DRA_status || 'pending')
        .input('approval', sql.Bit, draData.DRA_approval || 0)
        .input('added_by', sql.VarChar(100), draData.DRA_added_by)
        .input('provider_fk', sql.BigInt, draData.DRA_provider_fk)
        .input('outlet_fk', sql.NVarChar(100), draData.DRA_outlet_fk)
        .input('approved_by', sql.VarChar(100), draData.DRA_approved_by)
        .input('rejected_by', sql.VarChar(100), draData.DRA_rejected_by)
        .query(`
          INSERT INTO DietRequestApproval (
            DRA_doctor_notes, DRA_status, DRA_approval, DRA_added_by,
            DRA_provider_fk, DRA_outlet_fk, DRA_approved_by, DRA_rejected_by
          )
          OUTPUT INSERTED.*
          VALUES (
            @doctor_notes, @status, @approval, @added_by,
            @provider_fk, @outlet_fk, @approved_by, @rejected_by
          )
        `);
      await pool.close();
      return result.recordset[0];
    } catch (error) {
      console.error('Error creating diet request approval:', error);
      throw error;
    }
  }

  // Update diet request approval
  static async update(id, draData) {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request()
        .input('id', sql.BigInt, id)
        .input('doctor_notes', sql.NVarChar, draData.DRA_doctor_notes)
        .input('status', sql.VarChar(20), draData.DRA_status)
        .input('approval', sql.Bit, draData.DRA_approval)
        .input('approved_by', sql.VarChar(100), draData.DRA_approved_by)
        .input('rejected_by', sql.VarChar(100), draData.DRA_rejected_by)
        .query(`
          UPDATE DietRequestApproval 
          SET DRA_doctor_notes = @doctor_notes,
              DRA_status = @status,
              DRA_approval = @approval,
              DRA_approved_by = @approved_by,
              DRA_rejected_by = @rejected_by
          WHERE DRA_id = @id;
          
          SELECT * FROM DietRequestApproval WHERE DRA_id = @id;
        `);
      await pool.close();
      return result.recordset[0];
    } catch (error) {
      console.error('Error updating diet request approval:', error);
      throw error;
    }
  }

  // Delete diet request approval
  static async delete(id) {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request()
        .input('id', sql.BigInt, id)
        .query('DELETE FROM DietRequestApproval WHERE DRA_id = @id');
      await pool.close();
      return result.rowsAffected[0] > 0;
    } catch (error) {
      console.error('Error deleting diet request approval:', error);
      throw error;
    }
  }

  // Get diet request approvals by status
  static async getByStatus(status) {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request()
        .input('status', sql.VarChar(20), status)
        .query('SELECT * FROM DietRequestApproval WHERE DRA_status = @status ORDER BY DRA_added_on DESC');
      await pool.close();
      return result.recordset;
    } catch (error) {
      console.error('Error getting diet request approvals by status:', error);
      throw error;
    }
  }

  // Get diet request approvals by approval status
  static async getByApproval(approval) {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request()
        .input('approval', sql.Bit, approval)
        .query('SELECT * FROM DietRequestApproval WHERE DRA_approval = @approval ORDER BY DRA_added_on DESC');
      await pool.close();
      return result.recordset;
    } catch (error) {
      console.error('Error getting diet request approvals by approval:', error);
      throw error;
    }
  }

  // Approve a diet request
  static async approve(id, approvedBy, doctorNotes = null) {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request()
        .input('id', sql.BigInt, id)
        .input('approved_by', sql.VarChar(100), approvedBy)
        .input('doctor_notes', sql.NVarChar, doctorNotes)
        .query(`
          UPDATE DietRequestApproval 
          SET DRA_status = 'approved',
              DRA_approval = 1,
              DRA_approved_by = @approved_by,
              DRA_doctor_notes = ISNULL(@doctor_notes, DRA_doctor_notes)
          WHERE DRA_id = @id;
          
          SELECT * FROM DietRequestApproval WHERE DRA_id = @id;
        `);
      await pool.close();
      return result.recordset[0];
    } catch (error) {
      console.error('Error approving diet request:', error);
      throw error;
    }
  }

  // Reject a diet request
  static async reject(id, rejectedBy, doctorNotes = null) {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request()
        .input('id', sql.BigInt, id)
        .input('rejected_by', sql.VarChar(100), rejectedBy)
        .input('doctor_notes', sql.NVarChar, doctorNotes)
        .query(`
          UPDATE DietRequestApproval 
          SET DRA_status = 'rejected',
              DRA_approval = 0,
              DRA_rejected_by = @rejected_by,
              DRA_doctor_notes = ISNULL(@doctor_notes, DRA_doctor_notes)
          WHERE DRA_id = @id;
          
          SELECT * FROM DietRequestApproval WHERE DRA_id = @id;
        `);
      await pool.close();
      return result.recordset[0];
    } catch (error) {
      console.error('Error rejecting diet request:', error);
      throw error;
    }
  }
}

export default DietRequestApprovalModel; 