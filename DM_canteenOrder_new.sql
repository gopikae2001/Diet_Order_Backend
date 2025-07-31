-- Create DM_canteenOrder table in devdb database with new schema
USE devdb;
GO

-- Create the table if it doesn't exist
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
        -- Note: Foreign key constraints commented out as referenced tables may not exist
        -- CONSTRAINT FK_CO_patient_id FOREIGN KEY (CO_patient_id_fk) REFERENCES hodo_patient_registration(patient_id),
        CONSTRAINT FK_CO_diet_order FOREIGN KEY (CO_id) REFERENCES DM_DietOrder(DO_ID_PK)
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
        CO_patient_id_fk, CO_patient_name, CO_contact_number, CO_day, CO_date,
        CO_time, CO_category, CO_fooditem, CO_price, CO_intake_amount,
        CO_status, CO_added_by, CO_provider_fk, CO_outlet_fk
    ) VALUES 
    (
        1001, 'John Doe', 9876543210, '["Day 1", "Day 2", "Day 3"]', '["2024-01-15", "2024-01-16", "2024-01-17"]',
        '["08:00", "13:00", "19:00"]', '["Breakfast", "Lunch", "Dinner"]', '["Idli", "Rice and Dal", "Chapati and Vegetables"]', '[50, 80, 60]', '[2, 1.5, 2]',
        'pending', 'admin', 1, 'OUTLET001'
    ),
    (
        1002, 'Jane Smith', 9876543211, '["Day 1", "Day 2"]', '["2024-01-15", "2024-01-16"]',
        '["08:30", "13:30"]', '["Breakfast", "Lunch"]', '["Oatmeal", "Grilled Chicken Salad"]', '[40, 120]', '[1.5, 1]',
        'active', 'admin', 1, 'OUTLET001'
    ),
    (
        1003, 'Mike Johnson', 9876543212, '["Day 1"]', '["2024-01-15"]',
        '["19:00"]', '["Dinner"]', '["Chicken Breast with Vegetables"]', '[150]', '[2.5]',
        'delivered', 'admin', 1, 'OUTLET001'
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
    CO_id as ID,
    CO_patient_id_fk as 'Patient ID',
    CO_patient_name as 'Patient Name',
    CO_contact_number as 'Contact Number',
    CO_status as Status,
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

-- Show detailed view of first record
SELECT TOP 1 * FROM DM_canteenOrder ORDER BY CO_added_on DESC;
GO 