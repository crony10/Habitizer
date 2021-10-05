const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

// get all the habits and name
router.get("/", authorization, async (req, res) => {
    try {
        // res.json has the payload
        // res.json(req.user);

        // const user = await pool.query("SELECT user_name FROM users WHERE user_id = $1",[req.user]);

        const user = await pool.query(
            "SELECT u.user_name,h.habit_id,h.habit_name,h.habit_reward,h.habit_duration,h.habit_streak  FROM users AS u LEFT JOIN habits AS h ON u.user_id = h.user_id WHERE u.user_id = $1", [req.user.id]
        );

        res.json(user.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

// Create a habit
router.post("/habits",authorization, async (req, res) => {
    try {
        console.log(req.body);
        const { name } = req.body;
        const { reward } = req.body;
        const { duration } = req.body;
        const newHabit = await pool.query(
            "INSERT INTO habits (user_id,habit_name,habit_reward,habit_duration) VALUES ($1,$2,$3,$4) RETURNING *", [req.user.id,name, reward, duration]
        );
        res.json(newHabit.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
})

// update a habit
router.put("/habits/:id",authorization, async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const { duration } = req.body;
        const { reward } = req.body;
        const updatedHabit = await pool.query(
            "UPDATE habits SET habit_name = $1,habit_duration = $2,habit_reward = $3 WHERE habit_id = $4 AND user_id = $5 RETURNING *", [name,duration,reward, id,req.user.id]
        );

        if(updatedHabit.rows.length===0){
            return res.json("This habit is not yours");
        }
        res.json("HABIT WAS UPDATED");
    } catch (err) {
        console.log(err.message)
    }
})


// Delete a habit
router.delete("/habits/:id",authorization, async (req,res) => {
    try {
        const { id } = req.params;
        const deleteHabit = await pool.query("DELETE FROM habits WHERE habit_id = $1 AND user_id = $2 RETURNING *",[id,req.user.id]);


        if(deleteHabit.rows.length === 0){
            return res.json("The habit is not yours");
        }
        res.json("habit was deleted");
    } catch (err) {
        console.error(err.message);
    }
})

// Increase streak
router.put("/habits/increaseStreak/:id",authorization,async(req,res)=>{
    try {
        const { id } = req.params;
        const {streak} = req.body;
        console.log(streak);
        const increasedHabit = await pool.query(
            "UPDATE habits SET habit_streak = $1 WHERE habit_id = $2 AND user_id = $3  RETURNING *",[streak,id,req.user.id]
        );
        if(increasedHabit.rows.length===0){
            return res.json("This habit is not yours");
        }
        res.json("STREAK WAS INCREASED");
    } catch (err) {
        console.log(err.message);
    }
})

// Decrease the streak
router.put("/habits/decreaseStreak/:id",authorization,async(req,res)=>{
    try {
        const { id } = req.params;
        const {streak} = req.body;
        console.log(streak);
        const increasedHabit = await pool.query(
            "UPDATE habits SET habit_streak = $1 WHERE habit_id = $2 AND user_id = $3  RETURNING *",[streak,id,req.user.id]
        );
        if(increasedHabit.rows.length===0){
            return res.json("This habit is not yours");
        }
        res.json("STREAK WAS DECREASED");
    } catch (err) {
        console.log(err.message);
    }
})

module.exports = router;