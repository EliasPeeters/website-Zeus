let logger = require('../logger.js')

app.get('/imprint', function(req,  res){
    //console.log(req);
    res.render('impressum');
    logger.log(req)
});