const pool = require('./database');

const fixCate = `
ALTER TABLE category
MODIFY COLUMN slug VARCHAR(255) NOT NULL
`

const addField = `
ALTER TABLE users
ADD COLUMN avatar LONGTEXT,
MODIFY COLUMN status INT DEFAULT(1),
MODIFY COLUMN gender VARCHAR(20)
`
// const addRoles = `
// ALTER TABLE users
// ADD COLUMN roles VARCHAR(50) DEFAULT 'user'`
const fixColumn = `
ALTER TABLE settings
MODIFY COLUMN site_email VARCHAR(100) UNIQUE NOT NULL,
MODIFY COLUMN site_phone VARCHAR(10) UNIQUE NOT NULL,
MODIFY COLUMN site_brand LONGTEXT NULL
`
const fixNameField = `
ALTER TABLE users
MODIFY COLUMN role VARCHAR(50) DEFAULT 'user'`
pool.query(fixNameField, (err) => {
    if (err) throw err;
    console.log('add data success')
});