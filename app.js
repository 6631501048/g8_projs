const express = require('express'); 
const bcrypt = require('bcrypt'); 
const con = require('./db');
const app = express(); 
 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
//=====================================================

// password generator 
app.get('/password/:pass', (req, res) => { 
    const password = req.params.pass; 
    bcrypt.hash(password, 10, function(err, hash) { 
        if(err) { 
            return res.status(500).send('Hashing error'); 
        } 
        res.send(hash); 
    }); 
});  
 

//login
app.post('/login', (req, res) => { 
    const {username, password} = req.body; 
    const sql = "SELECT id, password FROM users WHERE username = ?"; 
    con.query(sql, [username], function(err, results) { 
        if(err) { 
            return res.status(500).send("Database server error"); 
 
        } 
        if(results.length != 1) { 
            return res.status(401).send("Wrong username"); 
        } 
        bcrypt.compare(password, results[0].password, function(err, same) { 
            if(err) { 
                return res.status(500).send("Hashing error"); 
            } 
            if(same) { 
 
                return res.json({ 
                    message: "Login OK", 
                    userId: results[0].id 
                }); 
            } 
            return res.status(401).send("Wrong password"); 
        }); 
    }) 
}); 
 
//all expenses
app.get('/expenses/:userId', (req, res) => { 
    const { userId } = req.params; 
    const sql = "SELECT id, items, paid, date FROM expenses WHERE user_id = ?"; 
    con.query(sql, [userId], function(err, results) { 
        if (err) { 
            return res.status(500).send("Database server error"); 
        } 
        return res.json(results); 
    }); 
}); 
 
//  Today's expenses 
app.get('/expenses/today/:userId', (req, res) => { 
    const { userId } = req.params; 
    const sql = ` 
        SELECT id, items, paid, date 
        FROM expenses 
        WHERE user_id = ? AND DATE(date) = CURDATE() 
    `; 
    con.query(sql, [userId], function(err, results) { 
        if (err) { 
            return res.status(500).send("Database server error"); 
        } 
        return res.json(results); 
    }); 
});

//=====================================================
const PORT = 3000; 
app.listen(PORT, () => console.log("Server running at " + PORT + " na ja nong")); 