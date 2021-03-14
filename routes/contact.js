let logger = require('../logger.js')

app.get('/contact', async function(req,  res){
    res.render('contact');
    logger.log(req)
});

app.post('/contact', async function(req, res){
    console.log(req.body)
});