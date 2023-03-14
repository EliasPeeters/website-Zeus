let logger = require('../logger.js')

app.get('/', function(req,  res){
    //console.log(req);

    let image = Math.round(Math.random() * 3) + 1

    res.render('main', {image});
    logger.log(req)
});

app.get('/new', function(req,  res){
    //console.log(req);

    let image = Math.round(Math.random() * 3) + 1

    res.render('mainNew', {image});
    logger.log(req)
});