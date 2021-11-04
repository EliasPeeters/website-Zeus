let logger = require('../logger.js')
let request = require('request');
const puppeteer = require('puppeteer');

app.get('/podcast', function(req,  res){
    //console.log(req);
    res.render('podcast');
    logger.log(req)
});
