const express = require('express');
const mysql = require('mysql')
const util2 = require('util');
const bodyparser = require('body-parser');

urlencodedparser = bodyparser.urlencoded({extended: false});

var sendmail = require('sendmail')({silent: true})

sendmail({
  from: 'test@yourdomain.com',
  to: 'elias.peeters@icloud.com',
  replyTo: 'jason@yourdomain.com',
  subject: 'MailComposer sendmail',
  html: 'Mail of test sendmail '
}, function (err, reply) {
  console.log(err && err.stack)
  console.dir(reply)
})

let logger = require('./logger.js')

app = express();

app.listen('8081');

connection = mysql.createConnection({
	host: 'server.eliaspeeters.de',
	user: 'root',
	password: 'TXvyjXz9AoNPbDg',
	database: 'website'
});

connection.connect((err) => {
	if (err) {
		console.log(err)
        return false
	} else {
		console.log('Conntected to Database');
        return true
	}
});

connection.asyncquery = util2.promisify(connection.query).bind(connection);

async function checkMYSQLConnection() {
    let result = await connection.asyncquery('SHOW DATABASES;')
    if (result != undefined) {
        return true
    } else {
        return false
    }
}

connection.removeTableNameFromArray = function(inputArray) {
    for (let i = 0; i < inputArray.length; i++) {
        if (inputArray[i] == 'table') {
            inputArray.splice(i, 1)
        }
    }
    return inputArray
}

connection.createQueryStringFromObject = function(inputObject) {
    let allKeys = connection.removeTableNameFromArray(Object.keys(inputObject));

    let query = '';
    query += 'INSERT INTO ';
    query += inputObject.table;
    query += ' ('
    for (let i = 0; i < allKeys.length; i++) {
        if (i == allKeys.length - 1) {
            query += allKeys[i] + ')'
        } else {
            query += allKeys[i] + ', '
        }
    }
    query += ' VALUES '
    query += '('
    for (let i = 0; i < allKeys.length; i++) {
        if (i == allKeys.length - 1) {
            query += mysql.escape(inputObject[allKeys[i]]) + ')'
        } else {
            query += mysql.escape(inputObject[allKeys[i]]) + ', '
        }
    }
    return query
}



app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.use(express.static('blog'));
app.use(express.urlencoded());

//routes

let home = require('./routes/home')
let cv = require('./routes/cv.js');
let contact = require('./routes/contact.js');
let blog = require('./routes/blog.js');
let imprint = require('./routes/impressum.js');
let search = require('./routes/search.js');

let Page404 = require('./routes/404.js');

console.log('Running on 8081')


module.exports = {connection, checkMYSQLConnection}