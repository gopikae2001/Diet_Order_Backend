import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { FoodItemModel } from './models/foodItem.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'db.json');

async function migrateFoodItems() {
  try {
    // Read existing data from db.json
    const dbData = JSON.parse(fs.readFileSync(dbPath));
    const foodItems = dbData.foodItems || [];
    
    console.log(`Found ${foodItems.length} food items to migrate...`);
    
    // Migrate each food item
    for (const item of foodItems) {
      const foodItemData = {
        FI_name: item.name,
        FI_foodType: item.foodType,
        FI_category: item.category,
        FI_unit: parseFloat(item.unit) || 0,
        FI_quantity: parseFloat(item.quantity) || 0,
        FI_price: parseFloat(item.price) || 0,
        FI_priceperunit: parseFloat(item.pricePerUnit) || 0,
        FI_added_by: 'migration',
        DRA_outlet_fk: 'default'
      };
      
      try {
        const newId = await FoodItemModel.create(foodItemData); // This now inserts into DM_FoodItem
        console.log(`✅ Migrated: ${item.name} (ID: ${newId})`);
      } catch (err) {
        console.error(`❌ Failed to migrate ${item.name}:`, err.message);
      }
    }
    
    console.log('Migration completed!');
  } catch (err) {
    console.error('Migration failed:', err);
  }
}

migrateFoodItems();