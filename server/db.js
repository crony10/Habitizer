const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "abcdef",
    host: "localhost",
    port: 5432,
    database: "authhabits"
});

module.exports = pool;