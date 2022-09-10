let logger = require('../logger.js')
let request = require('request');

app.get('/podcast', function(req,  res){
    //console.log(req);
    res.render('podcast');
    logger.log(req)
});
