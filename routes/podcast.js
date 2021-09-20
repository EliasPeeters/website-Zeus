let logger = require('../logger.js')
let request = require('request');

app.get('/podcast', function(req,  res){
    //console.log(req);
    res.render('podcast');
    logger.log(req)
});

app.get('/podcast2', function(req, res) {
    request('https://redcircle.com/embedded-show-webplayer/ac7565d9-ba20-4c82-8851-933cda3ab5dd?bgColor=%23fcfbf6', (err, result, body) => {
        if (err) { 
            console.error(err);
        }
        res.send(result)
        console.log(body);
    });
})