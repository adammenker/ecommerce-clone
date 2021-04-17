const mysql = require("mysql");
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({path: './.env'});

const app = express();
const db = mysql.createPool({
    host: "us-cdbr-east-03.cleardb.com",
    user: "b04903d33dd1c0",
    password: process.env.DATABASE_PASSWORD,
    database: "heroku_ce5d691c17f624d"
});




const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// parsing url
app.use(express.urlencoded({ extended: false}));
// parsing json
app.use(express.json());

app.set('view engine', 'hbs');

db.getConnection((error, connection) => {
    if(error){
        console.log(error);
        console.log('\n\n****************\n\n');
    } else {
        console.log("MYSQL Connected...");
    }
});

//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});