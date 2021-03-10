const express = require('express');

app = express();

app.listen('8080');

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.get('/', function(req,  res){
    res.render('main')
});