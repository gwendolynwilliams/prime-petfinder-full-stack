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

module.exports = router;