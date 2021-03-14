const express = require('express');
const mysql = require('mysql')
const util2 = require('util');

let logger = require('./logger.js')

app = express();

app.listen('8080');

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

//routes

let home = require('./routes/home')
let cv = require('./routes/cv.js')

console.log('Running on 8080')

module.exports = {connection}