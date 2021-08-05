const express = require('express');
const mysql = require('mysql')
const util2 = require('util');
const bodyparser = require('body-parser');
const path = require('path')
const fs = require('fs')
var https = require('https');
var request = require('request');

urlencodedparser = bodyparser.urlencoded({extended: false});

let logger = require('./logger.js')

serverConnectionsAll = JSON.parse(fs.readFileSync('./private/connections.json'))

if (process.env.ENV=="LOCAL") {
    let localConfig = JSON.parse(fs.readFileSync('./private/localConfig.json'))
    serverConnections = serverConnectionsAll.external

    for (connection in localConfig) {
        serverConnections[connection] = serverConnectionsAll[localConfig[connection]][connection]
        console.log('\x1b[33m%s\x1b[0m', `Using ${connection} ${localConfig[connection]}`)
    }
    
} else {
    serverConnections = serverConnectionsAll.internal;   
}

console.table(serverConnections)

request(serverConnections.blogServer, (err, res, body) => {
  if (err) { return console.log(err); }
  if (body == 'Success') {
      console.log('\x1b[36m%s\x1b[0m', `Connected to blogServer `)
  }
//   console.log(body.explanation);
});

app = express();

app.use(require('express-status-monitor')());

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
		console.log('\x1b[36m%s\x1b[0m', 'Conntected to Database');
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

app.use('/static', express.static('public'))
app.use(express.urlencoded());

//routes

let home = require('./routes/home')
let cv = require('./routes/cv.js');
let contact = require('./routes/contact.js');
let blog = require('./routes/blog.js');
let imprint = require('./routes/impressum.js');
let podcast = require('./routes/podcast.js');

let search = require('./routes/search.js');
let sitemap = require('./routes/sitemap.js');


let Page404 = require('./routes/404.js');

let sitemapCreator = require('./sitemapCreator.js')
sitemapCreator.createSitemap();

let port = 8081
app.listen(port, () => {
    console.log(`Running on ${port}`)
})


module.exports = {connection, checkMYSQLConnection}