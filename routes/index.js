const fs = require('fs')

// import { stringify } from "querystring";

module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `players` ORDER BY id ASC"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "Welcome to Socka | View Players",
                players: result
            });
            console.log(JSON.stringify(result));
            var data = JSON.stringify(result);
            fs.writeFile('data.json', data, (err) => {
                if (err) throw err;
                console.log('Data is written to file');
            })

        });

        console.log('this is after the write call')
    },
};