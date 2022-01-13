let logger = require('../logger.js')

app.get('/', function(req,  res){
    //console.log(req);
    analytics.page();
    
    analytics.track('test', {
        price: 20
    })

    res.render('main');
    logger.log(req)
});