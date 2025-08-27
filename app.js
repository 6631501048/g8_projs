const express = require('express'); 
const bcrypt = require('bcrypt'); 
const con = require('./db');
const app = express(); 
 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
//=====================================================

//Login

// all expenese

// Today's expenses

// Search expenses

// Add expense
app.post('/expenses/add', (req, res) => {
    const { items, paid, userId } = req.body;
    const sql = "INSERT INTO expenses (items, paid, date, user_id) VALUES (?, ?, NOW(), ?)";
    con.query(sql, [items, paid, userId], (err) => {
        if (err) return res.status(500).send("Database server error");
        return res.send("Expense added successfully");
    });
});
// Delete an expense

//=====================================================
const PORT = 3000; 
app.listen(PORT, () => console.log("Server running at " + PORT + " na ja nong")); 