var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var pg = require('pg');
var bodyParser = require('body-parser');

var connectionString = '';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

if(process.env.DATABASE_URL !== undefined) {
    connectionString = process.env.DATABASE_URL + 'ssl';
} else {
    connectionString = 'postgres://localhost:5432/Gwen';
}

router.post('/', function(req, res) {
    var results=[];

    var truncatedDesc = req.body.description.substring(0,498);

    //console.log(req.body);

    pg.connect(connectionString, function(err, client, done) {
        client.query('INSERT INTO favorites (api_id, image, name, description) VALUES ($1, $2, $3, $4);',
            [req.body.id, req.body.image, req.body.name, truncatedDesc],
            function(err, results) {
                done();
                if(err) {
                    console.log('Error inserting data: ', err);
                    res.send(false);
                } else {
                    res.send(results);
                }
            });
    });
});

router.get('/', function(req, res) {
    var results = [];

    pg.connect(connectionString, function(err, client, done) {
        var query = client.query('SELECT * FROM favorites');

        //Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        //close connection
        query.on('end', function() {
            done();
            //console.log(results);
            return res.json(results);
        });

        if(err) {
            console.log(err);
        }

    });
});


module.exports = router;