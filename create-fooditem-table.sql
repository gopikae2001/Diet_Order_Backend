-- FoodItem Table Creation Script
USE devdb;
GO
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'FoodItem')
BEGIN
  CREATE TABLE FoodItem (
    FI_ID_PK        BIGINT IDENTITY(1,1) PRIMARY KEY,
    FI_name         VARCHAR(255)      NOT NULL,
    FI_foodType     VARCHAR(50),
    FI_category     VARCHAR(100),
    FI_unit         DECIMAL(18,2),
    FI_quantity     DECIMAL(18,2),
    FI_price        DECIMAL(18,2),
    FI_priceperunit DECIMAL(18,2),
    FI_added_by     VARCHAR(100),
    FI_added_on     DATETIME DEFAULT GETDATE(),
    FI_modified_by  VARCHAR(100),
    FI_modified_on  DATETIME,
    DRA_outlet_fk   VARCHAR(100)
  );

