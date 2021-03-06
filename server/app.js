const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser()) ;

dotenv.config({path: './config.env'});
require('./db/connenction');
//const User = require('./model/userSchema');

app.use(express.json());

//we link the router files to make our route easy
app.use(require('./router/auth'));

const PORT = process.env.PORT || 5000

//middleware

/*
app.get('/about', (req, res) => {
    res.send('helo About world from the server');
});

app.get('/contact', (req, res) => {
    res.send('helo contact world from the server');
});

*/

app.get('/signin', (req, res) => {
    res.send('Login from the server');
});

app.get('/signup', (req, res) => {
    res.send('Registration from the server');
});


if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
}

app.listen(PORT, () => {
    console.log(`successfully ${PORT}`);
});

