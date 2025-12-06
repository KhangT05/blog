const mysql = require('mysql2');
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log('Connect with database successfully.');
    connection.release();
});
module.exports = pool