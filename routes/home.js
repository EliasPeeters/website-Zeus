let logger = require('../logger.js')

app.get('/', function(req,  res){
    //console.log(req);
    logger.log(req)
    res.render('main');
});