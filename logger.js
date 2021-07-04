let loggerEnable = false;

const geoip = require('geoip-lite');
const mysql = require('mysql');
const main = require('./website.js');
const sniffr = require('sniffr')


async function log(req, messageID = -1) {
    
    if (loggerEnable) {
        let ip = req.connection.remoteAddress;
        
        //ip = '37.4.252.185'
        let geodata = geoip.lookup(ip)
        const s = new sniffr().sniff(req.headers['user-agent']);

        let data = {
            table: 'log',
            browserName: s.browser.name,
            browserVersion: s.browser.versionString,
            osName: s.os.name,
            osVersion: s.os.versionString,
            date: new Date(),
            device: s.device.name,
            referer: req.headers.referer,
            pageVisited: req.route.path
        }
        
        if (geodata != null) {
            data.ip = ip;
            data.city = geodata.city;
            data.timezone = geodata.timezone;
            data.area = geodata.area;
            data.region = geodata.region;
            data.country = geodata.country;
        }

        let articleName = req.query.article;

        if (articleName != undefined) {
            data.articleName = articleName
        }
        if (messageID != -1) {
            data.message_id = messageID;
        }

        let query = connection.createQueryStringFromObject(data)
        //console.log(query)

        //console.log(messageID)

        //console.log(query)
        connection.asyncquery(query);
    }
    //console.log(req.headers.referer)
}

module.exports = {log}