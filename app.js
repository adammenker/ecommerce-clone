// initialization
const mysql = require("mysql");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config({path: './.env'});

const app = express();
const db = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});
const publicDirectory = path.join(__dirname, './public');

app.use(express.static(publicDirectory));

// parsing url & json
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// setting persistent login
app.use(cookieParser());


app.set('view engine', 'hbs');
db.getConnection((error, connection) => {
    if(error){
        console.log(error);
        console.log('\n******************************\n* Application is not Running *');
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