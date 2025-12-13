const pool = require('../config/database')
const settings = `CREATE TABLE IF NOT EXISTS settings(
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
// pool.query(settings, (err) => {
//     if (err) throw err;
//     console.log('create settings table successfully!')
// });
const add_status_to_settings_table = `
ALTER TABLE settings
ADD COLUMN status bool DEFAULT false AFTER site_social
`
pool.query(add_status_to_settings_table, (err) => {
    if (err) throw err;
    console.log('add field to settings table successfully!')
})