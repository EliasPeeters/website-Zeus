let logger = require('../logger.js')
let fs = require('fs');
const request = require('request');


app.get('/search/:text', urlencodedparser, function(req, res) {
    if (req.params.text == '') {
        res.send('');
        return;
    }

    request(`${serverConnections.hermes.address}/search/${req.params.text}`, (err, result, body) => {
        if (err) { 
            return console.log(err); 
        }
        res.send(body)
    });
})

app.get('/suggestion', urlencodedparser, function(req, res) {
    request(`${serverConnections.hermes.address}/suggestion`, (err, result, body) => {
        if (err) { 
            return console.log(err); 
        }
        res.send(body)
    });
})

module.exports = {app}