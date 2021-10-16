let logger = require('../logger.js')
const mysql = require('mysql');
const main = require('../website-zeus.js');
const bodyparser = require('body-parser');
const request = require('request');

urlencodedparser = bodyparser.urlencoded({extended: false});


app.get('/contact', urlencodedparser, async function(req,  res){
    let error = req.query.error == undefined ? '' : req.query.error; 
    let success = req.query.success == undefined ? '' : req.query.success; 
    res.render('contact', {error: error, success: success});
    logger.log(req)
});

function sendError(errorType, res, req) {
    res.redirect('/contact?error=Looks like you missed the ' + errorType)
    let contactResult = req.body;
}

app.post('/contact', async function(req, res){
    let contactResult = req.body;
    if (contactResult.firstName === '') {sendError('first name', res, req); return}
    if (contactResult.lastName === '') {sendError('last name', res, req); return}
    if (contactResult.subject === '') {sendError('subject', res, req); return}
    if (contactResult.message === '') {sendError('message', res, req); return}

    let data = {
        table: 'message',
        msg_firstName: contactResult.firstName,
        msg_lastName: contactResult.lastName,
        msg_Mail: contactResult.mail,
        msg_message: contactResult.message,
        msg_subject: contactResult.subject,
        msg_success: true,
        msg_time: new Date()
    }
    
    request(serverConnections.apollon.address + `/contactForm?subject=${contactResult.subject}&message=${contactResult.message}&time=${data.msg_time}&name=${data.msg_firstName} ${data.msg_lastName}&mail=${data.msg_Mail}`, (err, res, body) => {
    });

    let query = connection.createQueryStringFromObject(data);

    connection.query(query, function(err, result, fields) {
        if (err) {
          console.log(err);
          res.redirect('/contact?success=false')
        }
        logger.log(req, result.insertId)
        console.log(result.insertId);
    });
    res.redirect('/contact?success=The message has successfully been sent')
    //connection.asyncquery(query)
});