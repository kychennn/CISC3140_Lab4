-- create a database
sqlite3 lab4.db

.headers ON
.mode csv

-- Craete sample data table in an SQLite3 database
DROP TABLE IF EXISTS data_import;

CREATE TABLE data_import (
Timestamp DATETIME,
Email TEXT,
Name TEXT,
Year INT,
Make TEXT,
Model TEXT,
Car_ID INT,
Judge_ID TEXT,
Judge_Name TEXT,
Racer_Turbo INT,
Racer_Supercharged INT,
Racer_Performance INT,
Racer_Horsepower INT,
Car_Overall INT,
Engine_Modifications INT,
Engine_Performance INT,
Engine_Chrome INT,
Engine_Detailing INT,
Engine_Cleanliness INT,
Body_Frame_Undercarriage INT,
Body_Frame_Suspension INT,
Body_Frame_Chrome INT,
Body_Frame_Detailing INT,
Body_Frame_Cleanliness INT,
Mods_Paint INT,
Mods_Body INT,
Mods_Wrap INT,
Mods_Rims INT,
Mods_Interior INT,
Mods_Other INT,
Mods_ICE INT,
Mods_Aftermarket INT,
Mods_WIP INT,
Mods_Overall INT
);
-- Import a CSV File Into an SQLite Table
.import data/data.csv data_import



-- create Car table
DROP TABLE IF EXISTS Car;

CREATE TABLE Car(
Car_ID INT PRIMARY KEY,
Year INT,
Make TEXT,
Model TEXT,
Judge_ID TEXT,
Judge_Name TEXT
);

INSERT INTO Car (Car_ID, Year, Make, Model, Judge_ID, Judge_Name) 
SELECT Car_ID, Year, Make, Model, Judge_ID, Judge_Name
FROM data_import WHERE 1;


-- create Owner table
DROP TABLE IF EXISTS Owner;

CREATE TABLE Owner(
    Car_ID INT PRIMARY KEY,
    Name TEXT,
    Email TEXT
);

INSERT INTO Owner (Car_ID, Name, Email) SELECT Car_ID, Name, Email
FROM data_import WHERE 1;

-- optimize tables
DELETE FROM data_import WHERE Car_ID = 'Car_ID';
DELETE FROM Car WHERE Car_ID = 'Car_ID';
DELETE FROM Owner WHERE Car_ID = 'Car_ID';

-- .table
-- .quit