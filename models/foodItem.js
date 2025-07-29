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
  },
};

export class FoodItemModel {
  // Get all food items
  static async getAll() {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request().query('SELECT * FROM DM_FoodItem ORDER BY FI_ID_PK DESC');
      await pool.close();
      return result.recordset;
    } catch (err) {
      console.error('Error getting all food items:', err);
      throw err;
    }
  }

  // Get food item by ID
  static async getById(id) {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request()
        .input('id', sql.BigInt, id)
        .query('SELECT * FROM DM_FoodItem WHERE FI_ID_PK = @id');
      await pool.close();
      return result.recordset[0];
    } catch (err) {
      console.error('Error getting food item by ID:', err);
      throw err;
    }
  }

  // Create new food item
  static async create(foodItemData) {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request()
        .input('name', sql.VarChar(255), foodItemData.FI_name)
        .input('foodType', sql.VarChar(50), foodItemData.FI_foodType)
        .input('category', sql.VarChar(100), foodItemData.FI_category)
        .input('unit', sql.VarChar(50), foodItemData.FI_unit)
        .input('quantity', sql.Decimal(18, 2), foodItemData.FI_quantity)
        .input('price', sql.Decimal(18, 2), foodItemData.FI_price)
        .input('priceperunit', sql.Decimal(18, 2), foodItemData.FI_priceperunit)
        .input('added_by', sql.VarChar(100), foodItemData.FI_added_by)
        .input('outlet_fk', sql.VarChar(100), foodItemData.DRA_outlet_fk)
        .query(`
          INSERT INTO DM_FoodItem (FI_name, FI_foodType, FI_category, FI_unit, FI_quantity, 
                               FI_price, FI_priceperunit, FI_added_by, DRA_outlet_fk)
          VALUES (@name, @foodType, @category, @unit, @quantity, @price, @priceperunit, @added_by, @outlet_fk);
          SELECT SCOPE_IDENTITY() as id;
        `);
      await pool.close();
      return result.recordset[0].id;
    } catch (err) {
      console.error('Error creating food item:', err);
      throw err;
    }
  }

  // Update food item
  static async update(id, foodItemData) {
    try {
      const pool = await sql.connect(config);
      await pool.request()
        .input('id', sql.BigInt, id)
        .input('name', sql.VarChar(255), foodItemData.FI_name)
        .input('foodType', sql.VarChar(50), foodItemData.FI_foodType)
        .input('category', sql.VarChar(100), foodItemData.FI_category)
        .input('unit', sql.VarChar(50), foodItemData.FI_unit)
        .input('quantity', sql.Decimal(18, 2), foodItemData.FI_quantity)
        .input('price', sql.Decimal(18, 2), foodItemData.FI_price)
        .input('priceperunit', sql.Decimal(18, 2), foodItemData.FI_priceperunit)
        .input('modified_by', sql.VarChar(100), foodItemData.FI_modified_by)
        .input('outlet_fk', sql.VarChar(100), foodItemData.DRA_outlet_fk)
        .query(`
          UPDATE DM_FoodItem 
          SET FI_name = @name, FI_foodType = @foodType, FI_category = @category,
              FI_unit = @unit, FI_quantity = @quantity, FI_price = @price,
              FI_priceperunit = @priceperunit, FI_modified_by = @modified_by,
              FI_modified_on = GETDATE(), DRA_outlet_fk = @outlet_fk
          WHERE FI_ID_PK = @id
        `);
      await pool.close();
      return true;
    } catch (err) {
      console.error('Error updating food item:', err);
      throw err;
    }
  }

  // Delete food item
  static async delete(id) {
    try {
      const pool = await sql.connect(config);
      await pool.request()
        .input('id', sql.BigInt, id)
        .query('DELETE FROM DM_FoodItem WHERE FI_ID_PK = @id');
      await pool.close();
      return true;
    } catch (err) {
      console.error('Error deleting food item:', err);
      throw err;
    }
  }
} 