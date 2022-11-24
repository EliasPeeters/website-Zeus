const fs = require('fs');
const blog = require('./routes/posts');
var request = require('request');
var requestSync = require('sync-request');

let url = 'https://eliaspeeters.de'
const sitemapPath = 'public/sitemap.xml'
const date = new Date().toISOString()

async function getExpressRoutes() {
    let routes = await connection.asyncquery('SELECT * FROM sitemap');
    
    let expressRoutes = [];

    for (let i = 0; i < routes.length; i++) {
        expressRoutes.push({
            url: url + routes[i].url,
            lastUpdate: date
        })
    }
    
    return expressRoutes;
}

function createSitemapStringFormArray(inputArray) {
    let outputString = ''
    for(let i = 0; i < inputArray.length; i++) {
        outputString += '<url>'
        outputString += `<loc>${inputArray[i].url}</loc>`
        outputString += `<lastmod>${inputArray[i].lastUpdate}</lastmod>`
        outputString += '</url>'
    }
    return outputString
}

function removeOldSitemap() {
    try {
        fs.unlinkSync(sitemapPath);
        console.log('removed Sitemap')
    } catch {
        console.log('No old sitemap found')
    }
}


async function createSitemap() {
    removeOldSitemap();
    let xml = '<?xml version="1.0" encoding="utf-8" standalone="yes"?>'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'
    
    let expressRoutes = await getExpressRoutes();
    let expressRoutesString = createSitemapStringFormArray(expressRoutes);
    xml += expressRoutesString;


    xml += '</urlset>'
    fs.appendFileSync(sitemapPath, xml)
    //fs.writeFileSync('public/sitemap.xml', xml)
    console.log('Sitemap has been updated')
}

module.exports = {createSitemap, getExpressRoutes}