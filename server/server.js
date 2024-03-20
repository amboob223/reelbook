const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json());

// POST route to handle form submissions
app.post("/reelbook", async (req, res) => {
    try {
        const { name, email, phone, description, date } = req.body; // Use req.body for form data
        const data = await pool.query(
            "INSERT INTO clients(name, email, phone, description, date) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [name, email, phone, description, date]
        );
        const result = data.rows[0];
        res.json(result); // Send the result back as JSON
        console.log(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

const PORT = process.env.PORT || 5000; // Define the port correctly
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
