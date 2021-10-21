const fs = require('fs');
const blog = require('./routes/blog');
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

function getArticles() {
    let urlAttributes = `${serverConnections.blogServer.address}/attributes?server=${serverConnections.blogServer.position}`;
    let articleAttributes = JSON.parse(requestSync('GET', urlAttributes).getBody('utf8')).articles;
    
    let articles = []
    for (let i = 0; i < articleAttributes.length; i++) {
        articles.push({
            url: url + '/article?name=' + articleAttributes[i].name,
            lastUpdate: date
        })
    }
    return articles;
}

function getPapers() {
    let urlAttributes = `${serverConnections.ares.address}/attributes`;
    let paperAttributes = JSON.parse(requestSync('GET', urlAttributes).getBody('utf8'));
    // https://eliaspeeters.de/onepaper?name=socialMedia
    let papers = []
    for (element in paperAttributes) {
        papers.push({
            url: url + '/onepaper?name=' + paperAttributes[element].name,
            lastUpdate: date
        })
    }
    return papers;
}


async function createSitemap() {
    removeOldSitemap();
    let xml = '<?xml version="1.0" encoding="utf-8" standalone="yes"?>'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'
    
    let expressRoutes = await getExpressRoutes();
    let expressRoutesString = createSitemapStringFormArray(expressRoutes);
    xml += expressRoutesString;

    let articlesRoutes = getArticles();
    let articlesRoutesString = createSitemapStringFormArray(articlesRoutes);
    xml += articlesRoutesString;

    let paperRoutes = getPapers();
    let paperRoutesString = createSitemapStringFormArray(paperRoutes);
    xml += paperRoutesString;

    xml += '</urlset>'
    //fs.writeFileSync('public/sitemap.xml', '<?xml version="1.0" encoding="utf-8" standalone="yes"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml"><url><loc>https://eliaspeeters.de/blog/</loc><lastmod>2020-03-01T00:00:00+00:00</lastmod></url><url><loc>https://eliaspeeters.de/categories/</loc><lastmod>2020-03-01T00:00:00+00:00</lastmod></url><url><loc>https://eliaspeeters.de/tags/racket/</loc><lastmod>2020-03-01T00:00:00+00:00</lastmod></url><url><loc>https://eliaspeeters.de/categories/racket/</loc><lastmod>2020-03-01T00:00:00+00:00</lastmod></url><url><loc>https://eliaspeeters.de/blog/racketexplained/</loc><lastmod>2020-03-01T00:00:00+00:00</lastmod></url><url><loc>https://eliaspeeters.de/tags/</loc><lastmod>2020-03-01T00:00:00+00:00</lastmod></url><url><loc>https://eliaspeeters.de/</loc><lastmod>2020-02-28T00:00:00+00:00</lastmod></url><url><loc>https://eliaspeeters.de/blog/racketexamples/</loc><lastmod>2020-02-20T00:00:00+00:00</lastmod></url><url><loc>https://eliaspeeters.de/blog/rekursion/</loc><lastmod>2020-02-20T00:00:00+00:00</lastmod></url><url><loc>https://eliaspeeters.de/tags/test/</loc><lastmod>2020-02-20T00:00:00+00:00</lastmod></url><url><loc>https://eliaspeeters.de/portfolio/</loc><lastmod>2019-02-28T00:00:00+00:00</lastmod></url><url><loc>https://eliaspeeters.de/portfolio/item1/</loc><lastmod>2017-06-22T00:00:00+00:00</lastmod></url><url><loc>https://eliaspeeters.de/tags/helloworld/</loc></url><url><loc>https://eliaspeeters.de/blog/firstentry/</loc></url><url><loc>https://eliaspeeters.de/categories/other/</loc></url><url><loc>https://eliaspeeters.de/about/</loc></url></urlset>')
    fs.appendFileSync(sitemapPath, xml)
    //fs.writeFileSync('public/sitemap.xml', xml)
    console.log('Sitemap has been updated')
}

module.exports = {createSitemap, getExpressRoutes}