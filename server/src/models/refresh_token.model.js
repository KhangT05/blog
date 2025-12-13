const pool = require('../config/database');
const refresh_token = `
CREATE TABLE IF NOT EXISTS refresh_token(
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
user_id INT UNSIGNED NOT NULL,
refresh_token TEXT UNIQUE,
was_used boolean DEFAULT false,
is_revoked boolean DEFAULT false,
expires_at DATETIME DEFAULT CURRENT_TIMESTAMP,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)`;
pool.query(refresh_token, (err) => {
    if (err) throw err;
    console.log('create table refresh token successfully!')
})