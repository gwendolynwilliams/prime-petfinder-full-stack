var express = require('express');
var app = express();
var router = express.Router();
var pg = require('pg');
var bodyParser = require('body-parser');

var connectionString = '';

if(process.env.DATABASE_URL !== undefined) {
    connectionString = process.env.DATABASE_URL + 'ssl';
} else {
    connectionString = 'postgres://localhost:5432/Gwen';
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

router.post('/', function(req, res) {
    var results=[];
    console.log(req.body.data.id);
    //console.log('req.body.data.id: ', req.body.data[0]);
    pg.connect(connectionString, function(err, client, done) {
        client.query('INSERT INTO favorites (api_id, image, name, description) VALUES ($1, $2, $3, $4);',
            [req.data.id, req.data.image, req.data.name, req.data.description],
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