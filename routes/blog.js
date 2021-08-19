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
    let queryString = ''
    for (element in req.query) {
        queryString += `&${element}=${req.query[element]}`;
    }

    request(`${serverConnections.blogServer.address}/article/${req.query.name}?server=${serverConnections.blogServer.position}${queryString}`, (err, body) => {
        // res.send(body.body)
        if (body.body == 'Article does not exist') {
            res.redirect('/404')
        } else {
            res.render('article', {article: JSON.parse(body.body)})
        }
    });
})