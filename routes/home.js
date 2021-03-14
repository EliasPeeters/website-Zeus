let logger = require('../logger.js')

app.get('/', function(req,  res){
    //console.log(req);
    res.render('main');
    logger.log(req)
});