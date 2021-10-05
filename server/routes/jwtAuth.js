const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validateInfo = require("../middleware/validateInfo");
const authorization = require("../middleware/authorization");

// registering
router.post("/register",validateInfo, async (req, res) => {
    
    try {
        const { name,email,password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ]);

        // console.log(user.rows);
        // res.json(user.rows);
        
        if (user.rows.length > 0) {
            return res.status(401).json("User already exist!");
        }

        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);

        let newUser = await pool.query(
            "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, bcryptPassword]
        );

        const jwtToken = jwtGenerator(newUser.rows[0].user_id);

        return res.json({ jwtToken });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})


// Login route
router.post("/login", validateInfo, async (req, res) => {
    try {

        // 1. destructre the req.body(name,email,password)
        const {  email, password } = req.body;

        //2.check if user exist (if user doesn't exist then throw error)
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

        if (user.rows.length === 0) {
            return res.status(401).json("Password or email is incorrect");
        }

        //3. check if the incoming password is same as database password
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if (!validPassword) {
            return res.status(401).json("Password or email is incorrect");
        }

        // console.log(validPassword);

        //4. give them the jwt token
        const token = jwtGenerator(user.rows[0].user_id);

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

// verifying the jwt token
router.get("/is-verify", authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})


module.exports = router;