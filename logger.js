let loggerEnable = false;

const geoip = require('geoip-lite');
const mysql = require('mysql');
const main = require('./index.js');
const sniffr = require('sniffr')


async function log(req) {
    if (loggerEnable) {
        let ip = req.connection.remoteAddress;

        ip = '37.4.252.185'

        let geodata = geoip.lookup(ip)
        let city = geodata.city;
        let timezone = geodata.timezone;
        let area = geodata.area;
        let region = geodata.region;
        let country = geodata.country;
        const s = new sniffr().sniff(req.headers['user-agent']);
        let query = 'INSERT INTO log (ip, city, country, timezone, region, area, browserName, browserVersion, osName, osVersion, date, device, referer) VALUES (' +  mysql.escape(ip) + ',' + mysql.escape(city) + ',' + mysql.escape(country) + ',' + mysql.escape(timezone) + ',' + mysql.escape(region) + ',' + mysql.escape(area) + ',' + mysql.escape(s.browser.name) + ',' + mysql.escape(s.browser.versionString) + ',' + mysql.escape(s.os.name) + ',' + mysql.escape(s.os.versionString) + ',' + mysql.escape(new Date()) +  ',' + mysql.escape(s.device.name) +  ',' + mysql.escape(req.headers.referer) + ')';


        //console.log(query)
        connection.asyncquery(query);
    }
    //console.log(req.headers.referer)
}

module.exports = {log}