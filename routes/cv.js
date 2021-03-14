let logger = require('../logger.js')

app.get('/cv', async function(req,  res){
    res.render('cv');
    logger.log(req)
});