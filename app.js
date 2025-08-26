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

// Delete an expense

//=====================================================
const PORT = 3000; 
app.listen(PORT, () => console.log("Server running at " + PORT + " na ja nong")); 