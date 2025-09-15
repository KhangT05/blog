const pool = require('../config/database');
const comment = `
CREATE TABLE IF NOT EXISTS comment(
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
user_id INT UNSIGNED UNIQUE,
post_id INT UNSIGNED UNIQUE,
context NVARCHAR(255) NOT NULL,
parent_id INT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
)`
pool.query(comment, (err) => {
    if (err) throw err;
    console.log('add data success')
});