const Pool = require("pg").Pool;

const pool = new Pool({
    user: "habitizerdb_v2_user",
    password: "HulTJbVAcQPujQxB7wHPegG9hpLLwb8U",
    host: "dpg-cj16rii7l0ft7nkm1ql0-a.oregon-postgres.render.com",
    port: 5432,
    database: "habitizerdb_v2",
    ssl: {
        rejectUnauthorized: false // Adjust this based on your SSL configuration
    }
});

module.exports = pool;