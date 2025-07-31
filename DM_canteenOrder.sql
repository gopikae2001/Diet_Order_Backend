-- Create DM_canteenOrder table in devdb database
USE devdb;
GO

-- Create the table if it doesn't exist
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'DM_canteenOrder')
BEGIN
    CREATE TABLE DM_canteenOrder (
        CO_ID_PK              BIGINT IDENTITY(1,1) PRIMARY KEY,
        CO_patientName        VARCHAR(255) NOT NULL,
        CO_bed                VARCHAR(50),
        CO_ward               VARCHAR(100),
        CO_dietPackageName    VARCHAR(255),
        CO_dietType           VARCHAR(100),
        CO_foodItems          NVARCHAR(MAX),
        CO_specialNotes       NVARCHAR(MAX),
        CO_status             VARCHAR(50) DEFAULT 'pending',
        CO_prepared           BIT DEFAULT 0,
        CO_delivered          BIT DEFAULT 0,
        CO_dieticianInstructions NVARCHAR(MAX),
        CO_mealItems          NVARCHAR(MAX),
        CO_added_by           VARCHAR(100),
        CO_added_on           DATETIME DEFAULT GETDATE(),
        CO_modified_by        VARCHAR(100),
        CO_modified_on        DATETIME,
        CO_outlet_fk          VARCHAR(100),
        CONSTRAINT CK_CO_status CHECK (CO_status IN ('pending', 'active', 'paused', 'stopped', 'prepared', 'preparing', 'delivered'))
    );
    PRINT 'DM_canteenOrder table created successfully';
END
ELSE
BEGIN
    PRINT 'DM_canteenOrder table already exists';
END
GO

-- Insert sample data
IF NOT EXISTS (SELECT TOP 1 * FROM DM_canteenOrder)
BEGIN
    INSERT INTO DM_canteenOrder (
        CO_patientName, CO_bed, CO_ward, CO_dietPackageName, CO_dietType,
        CO_foodItems, CO_specialNotes, CO_status, CO_prepared, CO_delivered,
        CO_dieticianInstructions, CO_mealItems, CO_added_by, CO_outlet_fk
    ) VALUES 
    (
        'John Doe', '101', 'General', 'Standard Diet', 'Vegetarian',
        '["Rice", "Dal", "Vegetables"]', 'Patient prefers less spicy food', 'pending', 0, 0,
        'Monitor sodium intake', '{"breakfast": [{"foodItemId": "1", "foodItemName": "Idli", "quantity": 2, "unit": "pieces"}]}', 'admin', 'OUTLET001'
    ),
    (
        'Jane Smith', '102', 'Cardiology', 'Low Sodium Diet', 'Diabetic',
        '["Brown Rice", "Grilled Chicken", "Steamed Vegetables"]', 'Patient has diabetes and hypertension', 'prepared', 1, 0,
        'Low sodium, low sugar diet', '{"lunch": [{"foodItemId": "2", "foodItemName": "Brown Rice", "quantity": 1, "unit": "cup"}]}', 'admin', 'OUTLET001'
    ),
    (
        'Mike Johnson', '103', 'Orthopedics', 'High Protein Diet', 'Non-Vegetarian',
        '["Chicken Breast", "Eggs", "Milk"]', 'Patient needs protein for muscle recovery', 'active', 0, 0,
        'High protein diet for muscle building', '{"dinner": [{"foodItemId": "3", "foodItemName": "Chicken Breast", "quantity": 150, "unit": "grams"}]}', 'admin', 'OUTLET001'
    );
    
    PRINT 'Sample data inserted successfully';
END
ELSE
BEGIN
    PRINT 'Table already has data';
END
GO

-- View all data in the table
SELECT 
    CO_ID_PK as ID,
    CO_patientName as 'Patient Name',
    CO_bed as Bed,
    CO_ward as Ward,
    CO_dietPackageName as 'Diet Package',
    CO_dietType as 'Diet Type',
    CO_status as Status,
    CASE WHEN CO_prepared = 1 THEN 'Yes' ELSE 'No' END as Prepared,
    CASE WHEN CO_delivered = 1 THEN 'Yes' ELSE 'No' END as Delivered,
    CO_added_on as 'Added On',
    CO_outlet_fk as 'Outlet'
FROM DM_canteenOrder 
ORDER BY CO_added_on DESC;
GO

-- Show table structure
SELECT 
    COLUMN_NAME as 'Column Name',
    DATA_TYPE as 'Data Type',
    IS_NULLABLE as 'Nullable',
    COLUMN_DEFAULT as 'Default Value'
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'DM_canteenOrder'
ORDER BY ORDINAL_POSITION;
GO

-- Count total records
SELECT COUNT(*) as 'Total Records' FROM DM_canteenOrder;
GO 