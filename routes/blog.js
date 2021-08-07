const fs = require('fs')
const path = require('path');
let logger = require('../logger.js');
let util = require('util');
var request = require('request');
const { app } = require('./search.js');

app.get('/blog', async function(req, res) {
    logger.log(req)
    request(`${serverConnections.blogServer.address}/attributes?server=${serverConnections.blogServer.position}`, (err, body) => {
        let articleAttributes = JSON.parse(body.body);
        res.render('blog', {articleAttributes: articleAttributes.articles})
        // res.send(articleAttributes)
    });
})

app.get('/article', urlencodedparser, async function(req, res) {
    logger.log(req)
    request(`${serverConnections.blogServer.address}/article/${req.query.name}?server=${serverConnections.blogServer.postion}`, (err, body) => {
        // res.send(body.body)
        console.log(JSON.parse(body.body))
        res.render('article', {article: JSON.parse(body.body)})
    });
})