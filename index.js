const express = require('express');
const mysql = require('mysql')
const util2 = require('util');
const bodyparser = require('body-parser');

urlencodedparser = bodyparser.urlencoded({extended: false});

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
	} else {
		console.log('Conntected to Database');
	}
});

connection.asyncquery = util2.promisify(connection.query).bind(connection);



app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.use(express.static('blog'));
app.use(express.urlencoded());

//routes

let home = require('./routes/home')
let cv = require('./routes/cv.js');
let contact = require('./routes/contact.js');
let blog = require('./routes/blog.js');
let Page404 = require('./routes/404.js')

console.log('Running on 8081')

module.exports = {connection}