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

function sendError(errorType, res, req) {
    res.redirect('/contact?error=Looks like you missed the ' + errorType)
    let contactResult = req.body;

}

app.post('/contact', async function(req, res){
    let contactResult = req.body;
    if (contactResult.firstName === '') {sendError('firstname', res, req); return}
    if (contactResult.lastName === '') {sendError('lastname', res, req); return}
    if (contactResult.subject === '') {sendError('subject', res, req); return}
    if (contactResult.message === '') {sendError('message', res, req); return}

    let data = {
        table: 'message',
        message_firstName: contactResult.firstName,
        message_lastName: contactResult.lastName,
        message_Mail: contactResult.mail,
        message_message: contactResult.message,
        message_subject: contactResult.subject,
        message_success: true
    }
    let query = connection.createQueryStringFromObject(data);
    console.log(query)
    connection.asyncquery(query)
    console.log(contactResult)
});