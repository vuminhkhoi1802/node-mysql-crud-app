const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
// const sqlite3 = require('sqlite3').verbose();


const {
    getHomePage
} = require('./routes/index');
const {
    addPlayerPage,
    addPlayer,
    deletePlayer,
    editPlayer,
    editPlayerPage
} = require('./routes/player');
const port = 5000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.

const db = mysql.createConnection({
    // host: '192.168.100.199',
    // port: 3306,
    // user: 'vuminhkhoi1802',
    // password: 'Trang19082008!',
    // database: 'socka'
    host: 'localhost',
    user: 'vuminhkhoi1802',
    password: 'Trang19082008!',
    database: 'socka'
});

// let db = new sqlite3.Database('./socka.db', sqlite3.OPEN_READWRITE, (err) => {
//     if (err) {
//         console.error(err.message);
//     }
//     console.log('Connected to socka Sqlite Database')
// })

// connect to database

db.connect((err) => {
    if (err) {
        console.log('Error occured in MySQL')
        throw err;
        
    }
    console.log('Connected to database');
});
global.db = db;


// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload



// routes for the app

app.get('/', getHomePage);
app.get('/add', addPlayerPage);
app.get('/edit/:id', editPlayerPage);
app.get('/delete/:id', deletePlayer);
app.post('/add', addPlayer);
app.post('/edit/:id', editPlayer);


// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});