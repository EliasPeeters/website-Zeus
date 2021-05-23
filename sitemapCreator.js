const fs = require('fs')

let url = 'https://eliaspeeters.de'

function getExpressRoutes() {
    let expressRoutesNativ = app._router.stack;
    let expressRoutes = []
    let date = new Date().toISOString()
    for (let i = 0; i < expressRoutesNativ.length-1; i++) {
        if (expressRoutesNativ[i].route !== undefined && expressRoutesNativ[i].route.methods.get == true) {
            expressRoutes.push({
                url: url + expressRoutesNativ[i].route.path,
                lastUpdate: date
            })
        }
    }
    return expressRoutes;
}

function createStringFormArray(inputArray) {
    let outputString = ''
    for(let i = 0; i < inputArray.length; i++) {
        outputString += '<url>'
        outputString += `<loc>${inputArray[i].url}</loc>`
        outputString += `<lastmod>${inputArray[i].lastUpdate}</lastmod>`
        outputString += '</url>'
    }
    return outputString
}

function createSitemap() {
    let xml = '<?xml version="1.0" encoding="utf-8" standalone="yes"?>'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'
    
    let expressRoutes = getExpressRoutes()
    let expressRoutesString = createStringFormArray(expressRoutes);
    xml += expressRoutesString
    
    xml += '</urlset>'
    //fs.writeFileSync('public/sitemap.xml', '<?xml version="1.0" encoding="utf-8" standalone="yes"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml"><url><loc>https://eliaspeeters.de/blog/</loc><lastmod>2020-03-01T00:00:00+00:00</lastmod></url><url><loc>https://eliaspeeters.de/categories/</loc><lastmod>2020-03-01T00:00:00+00:00</lastmod></url><url><loc>https://eliaspeeters.de/tags/racket/</loc><lastmod>2020-03-01T00:00:00+00:00</lastmod></url><url><loc>https://eliaspeeters.de/categories/racket/</loc><lastmod>2020-03-01T00:00:00+00:00</lastmod></url><url><loc>https://eliaspeeters.de/blog/racketexplained/</loc><lastmod>2020-03-01T00:00:00+00:00</lastmod></url><url><loc>https://eliaspeeters.de/tags/</loc><lastmod>2020-03-01T00:00:00+00:00</lastmod></url><url><loc>https://eliaspeeters.de/</loc><lastmod>2020-02-28T00:00:00+00:00</lastmod></url><url><loc>https://eliaspeeters.de/blog/racketexamples/</loc><lastmod>2020-02-20T00:00:00+00:00</lastmod></url><url><loc>https://eliaspeeters.de/blog/rekursion/</loc><lastmod>2020-02-20T00:00:00+00:00</lastmod></url><url><loc>https://eliaspeeters.de/tags/test/</loc><lastmod>2020-02-20T00:00:00+00:00</lastmod></url><url><loc>https://eliaspeeters.de/portfolio/</loc><lastmod>2019-02-28T00:00:00+00:00</lastmod></url><url><loc>https://eliaspeeters.de/portfolio/item1/</loc><lastmod>2017-06-22T00:00:00+00:00</lastmod></url><url><loc>https://eliaspeeters.de/tags/helloworld/</loc></url><url><loc>https://eliaspeeters.de/blog/firstentry/</loc></url><url><loc>https://eliaspeeters.de/categories/other/</loc></url><url><loc>https://eliaspeeters.de/about/</loc></url></urlset>')
    fs.writeFileSync('public/sitemap.xml', xml)
    console.log('Sitemap has been updated')
}

module.exports = {createSitemap}