let logger = require('../logger.js')

app.get('/podcast', function(req,  res){
    //console.log(req);
    res.render('podcast');
    logger.log(req)
});