const fs = require('fs')
const path = require('path');
let logger = require('../logger.js');
let util = require('util');
var request = require('request');
let mysql = require('mysql');
const { app } = require('./search.js');

app.get('/posts', async function(req, res) {

    let posts = await connection.asyncquery('SELECT * FROM posts');
    
    res.render('posts', {posts})
})

app.get('/post/:postID', async function(req, res) {

    let singlePost = await connection.asyncquery(`SELECT * FROM posts WHERE id=${mysql.escape(req.params.postID)}`);

    res.render('partials/post', {posts: singlePost})
})

app.get('/post/test/:postID', async function(req, res) {

    let singlePost = await connection.asyncquery(`SELECT * FROM posts WHERE id=${mysql.escape(req.params.postID)}`);
    console.log(singlePost)
    res.render('tests/postTester', {posts: singlePost})
})