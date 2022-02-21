const fs = require('fs')
const path = require('path');
let logger = require('../logger.js');
let util = require('util');
var request = require('request');
const { app } = require('./search.js');

app.get('/blog', async function(req, res) {
    logger.log(req)
    request(`${serverConnections.blogServer.address}/attributes?server=${serverConnections.blogServer.position}&sort=date-1`, (err, body) => {
        let articleAttributes = JSON.parse(body.body);
        res.render('blog', {articleAttributes: articleAttributes.articles})
        // res.send(articleAttributes)
    });
})

app.get('/blog/:article', async function(req, res) {
    console.log(req.params.article)

    let queryString = ''
    for (element in req.query) {
        queryString += `&${element}=${req.query[element]}`;
    }
    console.log(`${serverConnections.blogServer.address}/article/${req.params.article}?server=${serverConnections.blogServer.position}${queryString}`)
    request(`${serverConnections.blogServer.address}/article/${req.params.article}?server=${serverConnections.blogServer.position}${queryString}`, (err, body) => {
        // res.send(body.body)
        if (body.body == 'Article does not exist') {
            res.redirect('/404')
        } else {
            // console.log(JSON.parse(body.body))
            res.render('article', {article: JSON.parse(body.body)})
        }
    });
})