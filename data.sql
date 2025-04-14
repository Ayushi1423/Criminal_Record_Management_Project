-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL 
);

-- Create criminals table
CREATE TABLE IF NOT EXISTS criminals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL,
  crime_type TEXT NOT NULL,
  crime_severity TEXT NOT NULL,
  arrest_date TEXT NOT NULL, -- Consider using ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ)
  arrest_location TEXT NOT NULL,
  officer_in_charge TEXT NOT NULL,
  case_status TEXT NOT NULL,
  description TEXT NOT NULL, -- Added description field
  prison_name TEXT,          -- Optional
  release_date TEXT,         -- Optional, Consider using ISO 8601 format
  photo_path TEXT            -- Added photo_path field to store the image file path
);

-- Insert criminal records data
INSERT INTO criminals (
  name, age, gender, crime_type, crime_severity, arrest_date, 
  arrest_location, officer_in_charge, case_status, description, 
  prison_name, release_date, photo_path
) VALUES 
-- 1
('Johnny Stripe', 32, 'Male', 'Theft', 'Misdemeanor', '2025-03-01T15:45:00Z', 
'Trainyard Alley, Toon City', 'Officer #1045', 'Charged', 
'Caught attempting to steal a gold pocket watch from a museum display.', 
'Toonville Correctional', '2025-08-01', 'uploads/criminals/JohnnyStripe.jpeg'),

-- 2
('Shinchan Nohara', 5, 'Male', 'Disturbance of Peace', 'Infraction', '2025-03-15T09:30:00Z', 
'City Park, Kasukabe', 'Officer Yumeko', 'Acquitted', 
'Arrested for excessive public mischief involving fireworks and a water balloon ambush.', 
null, null, 'uploads/criminals/ShinchanNohara.jpg'),

-- 3
('Mr. Bean', 45, 'Male', 'Property Damage', 'Misdemeanor', '2025-03-22T11:15:00Z', 
'Toy Store, Central Toon Town', 'Sgt. Wobbleton', 'Convicted', 
'Accidentally demolished a toy shelf while chasing his teddy bear.', 
'Toonville Correctional', '2025-10-15', 'uploads/criminals/MrBean.jpg'),

-- 4
('Shadow Skull', 35, 'Male', 'Assault', 'Felony', '2025-02-28T23:00:00Z', 
'Old Docks, Metroville', 'Detective Harper #291', 'Under Investigation', 
'Physically assaulted three guards during a robbery. Known vigilante with violent history.', 
null, null, 'uploads/criminals/ShadowSkull.jpg'),

-- 5
('Grizzle the Bear', 40, 'Male', 'Escape Attempt', 'Felony', '2025-04-01T02:30:00Z', 
'Jungle Penitentiary', 'Warden Bruno', 'Charged', 
'Bent prison bars and attempted escape using brute force. Recaptured swiftly.', 
'High-Security Zoo Prison', null, 'uploads/criminals/GrizzletheBear.jpeg'),

-- 6
('Droopy Dog', 58, 'Male', 'Fraud', 'Misdemeanor', '2025-01-10T14:00:00Z', 
'Cartoon Bank, Toon Town', 'Officer Sadface', 'Closed', 
'Allegedly forged identity to receive double pension. Case dropped due to lack of evidence.', 
null, null, 'uploads/criminals/DroopyDog.png'),

-- 7
('The Powerpuff Girls', 6, 'Female', 'Destruction of Property', 'Misdemeanor', '2025-04-05T17:20:00Z', 
'Townsville Main Plaza', 'Captain Manly', 'Pending', 
'Caught in collateral damage during an unauthorized monster fight. Public debate ongoing.', 
'Juvenile Facility - Townsville', null, 'uploads/criminals/ThePowerpuffGirls.jpg');

-- Insert default admin user with plaintext password 'AdminAdminAdmin'
-- We'll use plaintext password for simplicity during development
INSERT INTO users (username, password) VALUES 
('admin@admin.com', 'AdminAdminAdmin'); 