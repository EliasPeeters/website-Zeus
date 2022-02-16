const express = require('express');
const mysql = require('mysql')
const util2 = require('util');
const bodyparser = require('body-parser');
const path = require('path')
const fs = require('fs')
var https = require('https');
var request = require('request');
let credentialsLoader = require('./getCredentials');
let mysqlSetup = require('./mysqlSetup');
const requestSync = require('sync-request');
const checkConnections = require('./connections/checkConnections');
const Analytics = require('analytics').default;
const googleAnalytics =  require('@analytics/google-analytics').default
// import googleAnalytics from '@analytics/google-analytics';

urlencodedparser = bodyparser.urlencoded({extended: false});

let logger = require('./logger.js')

serverConnectionsAll = JSON.parse(fs.readFileSync('./private/connections.json'))

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

if (process.env.ENV=="LOCAL") {
    let localConfig = JSON.parse(fs.readFileSync('./private/localConfig.json'))
    serverConnections = clone(serverConnectionsAll.external)

    for (connection in serverConnections) {
        serverConnections[connection] = {address: serverConnections[connection]}
    }

    for (connection in localConfig) {
        serverConnections[connection] = {
            address: serverConnectionsAll[localConfig[connection]][connection],
            position: localConfig[connection]
        }
        console.log('\x1b[33m%s\x1b[0m', `Using ${connection} ${localConfig[connection]}`)
    }
    
} else {
    serverConnections = serverConnectionsAll.internal;   
    for (connection in serverConnections) {
        serverConnections[connection] = {
            address: serverConnections[connection],
            position: 'external'
        }
    }
}

console.table(serverConnections)

checkConnections.checkAllConnections();

app = express();
credentials = credentialsLoader.getCredentials();
connection = mysqlSetup.getConnection();


// analytics
analytics = Analytics({
    app: 'eliaspeeters.de',
    plugings: [
        googleAnalytics({
            trackingId: 'G-0K1GCBP7BV'
        })
    ]
})

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.use(express.static('blog'));
app.use('/static', express.static('public'));
app.use('/paper', express.static('paper'));

app.use(express.urlencoded());

//routes

let home = require('./routes/home')
let cv = require('./routes/cv.js');
let contact = require('./routes/contact.js');
let blog = require('./routes/blog.js');
let imprint = require('./routes/impressum.js');
let podcast = require('./routes/podcast.js');
let linktree = require('./routes/podcastLinkTree');
let papers = require('./routes/papers');
let heraConnection = require('./routes/heraConnection');
let expressRoutes = require('./routes/expressRoutes');


let search = require('./routes/search.js');
let sitemap = require('./routes/sitemap.js');


let Page404 = require('./routes/404.js');

let sitemapCreator = require('./sitemapCreator.js')
sitemapCreator.createSitemap();


let port = process.env.ENV == 'DEVELOP' ? 8093:8081;

app.listen(port, () => {
    console.log(`Running on ${port}`)
})

// Start Script
function startUp() {
    // send start message to Apollon;
    let message = 'Zeus started...';
    requestSync('GET', encodeURI(`${serverConnections.apollon.address}/message?pswd=${credentials.telegram.pswd}&message=🖥 ${message}`));
    
    
    console.log('Finised startUp');
}
startUp();



module.exports = {connection}