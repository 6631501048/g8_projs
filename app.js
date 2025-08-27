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
app.get('/expenses/search/:userId', (req, res) => {
    const { userId } = req.params;
    const keyword = req.query.keyword || "";

    const sql = "SELECT id, items, paid, date FROM expenses WHERE user_id = ? AND items LIKE ?";
    con.query(sql, [userId, `%${keyword}%`], function(err, results) {
        if (err) {
            return res.status(500).send("Database server error");
        }
        return res.json(results);
    });
});


// Add expense

// Delete an expense
app.delete('/expenses/:userId/:expenseId', (req, res) => {
  const { userId, expenseId } = req.params;
  const sql = "DELETE FROM expenses WHERE id = ? AND user_id = ?";
  con.query(sql, [expenseId, userId], (err, result) => {
    if(err) return res.status(500).send("Database server error");
    if(result.affectedRows === 0) return res.status(404).send("Expense not found");
    return res.send("Expense deleted successfully");
  });
});
//=====================================================
const PORT = 3000; 
app.listen(PORT, () => console.log("Server running at " + PORT + " na ja nong")); 