const Pool = require("pg").Pool;

const pool = new Pool({
    user: "habitizerv1_user",
    password: "nuoIqdjdtXi8Q0c2oPoUBGBGYBwZMGLZ",
    host: "dpg-ch5bdfd269v8910giqq0-a.oregon-postgres.render.com",
    port: 5432,
    database: "habitizerv1",
    ssl: {
        rejectUnauthorized: false // Adjust this based on your SSL configuration
    }
});

module.exports = pool;