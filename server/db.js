const Pool = require("pg").Pool;

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false // Adjust this based on your SSL configuration
    }
});

module.exports = pool;