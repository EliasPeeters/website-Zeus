const express = require('express');
const geoip = require('geoip-lite');

app = express();

app.listen('8080');

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.get('/', function(req,  res){
    console.log(req);
    console.log(req.connection.remoteAddress)
    res.render('main');
});

app.get('/cv', function(req,  res){
    res.render('cv')
});

console.log('Running on 8080')