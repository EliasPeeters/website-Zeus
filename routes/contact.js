let logger = require('../logger.js')
const mysql = require('mysql');
const main = require('../index.js');
const bodyparser = require('body-parser');

urlencodedparser = bodyparser.urlencoded({extended: false});


app.get('/contact', urlencodedparser, async function(req,  res){
    let error = req.query.error == undefined ? '' : req.query.error; 
    console.log(error)
    console.log(req.query)
    res.render('contact', {error: error});
    logger.log(req)
});

function sendError(errorType, res) {
    res.redirect('/contact?error=Looks like you missed the ' + errorType)
}

app.post('/contact', async function(req, res){
    let contactResult = req.body;
    if (contactResult.firstName === '') {sendError('firstname', res); return}
    if (contactResult.lastName === '') {sendError('lastname', res); return}
    if (contactResult.subject === '') {sendError('subject', res); return}
    if (contactResult.message === '') {sendError('message', res); return}

    console.log(contactResult)
});