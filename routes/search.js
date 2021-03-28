let logger = require('../logger.js')

console.log('test')

app.get('/search', async function(req,  res){
    res.send('test');
    logger.log(req)
});