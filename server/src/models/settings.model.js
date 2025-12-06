const pool = require('../config/database')
const addSettings = `CREATE TABLE IF NOT EXISTS settings(
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
site_name NVARCHAR(255) NOT NULL,
site_brand LONGTEXT NOT NULL,
site_email VARCHAR(100) UNIQUE NOT NULL,
site_phone VARCHAR(10) UNIQUE NOT NULL,
site_address NVARCHAR(255) NOT NULL,
site_social LONGTEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`
pool.query(addSettings, (err) => {
    if (err) throw err;
    console.log('add data success')
});