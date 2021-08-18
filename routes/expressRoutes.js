const sitemapCreator = require('../sitemapCreator');


app.get('/expressRoutes', (req, res) => {
    let expressRoutes = sitemapCreator.getExpressRoutes();
    res.send(expressRoutes)
})
