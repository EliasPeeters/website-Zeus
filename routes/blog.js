const fs = require('fs')
const path = require('path');
const Showdown = require('showdown');
let logger = require('../logger.js');
let util = require('util');
var request = require('request');

let converter = new Showdown.Converter()

const articlePath = './blog'

function readAllArticles() {
    let articles = fs.readdirSync(articlePath)
    for (let i = 0; i < articles.length; i++) {
        let ending = articles[i].slice(-2);
        if (ending == 'md') {
            articles[i] = articles[i].replace('.md', '');
        } else {
            articles.splice(i, 1)
            i = i - 1
        }
    }
    return articles
}

async function readArticle(name) {
    fs.readFile('./blog/' + name + '.md', 'utf8' , async function(err, data) {
        if (err) {
          console.error(err)
          return
        }
        return converter.makeHtml(data)
      })
}

function extractAttributes(data, name) {
    let closingBracket = data.indexOf('}');
    if (closingBracket == -1) {
        console.error('In der Datei ' + name + '.md fehlen die Attribute')
        return {}
    } else {
        let attributes = data.substring(0, closingBracket + 1);

        attributes = attributes.replace(/(\r\n|\n|\r)/gm, "");
        let json = JSON.parse(attributes)
        return json
    }
}

function returnMonth(month) {
    switch (month){
        case 0: return 'Jan';
        case 1: return 'Feb';
        case 2: return 'Mar';
        case 3: return 'Apr';
        case 4: return 'May';
        case 5: return 'Jun';
        case 6: return 'Jul';
        case 7: return 'Aug';
        case 8: return 'Sep';
        case 9: return 'Oct';
        case 10: return 'Nov';
        case 11: return 'Dec';
    }
}

function formatDate(date) {
    let dateString = '';
    dateString += returnMonth(date.getMonth());
    dateString += ' ' + date.getDate();
    dateString += '. ' + date.getFullYear();
    return dateString
}

function readAllAttributes() {
    let output = []
    for (let i = 0; i < articles.length; i++) {
        let data = fs.readFileSync('./blog/' + articles[i] + '.md', {encoding:'utf8', flag:'r'});
        let attributes = extractAttributes(data, articles[i])
        attributes.name = articles[i]
        attributes.dateUTC = new Date(attributes.date)
        attributes.dateReadable = formatDate(attributes.dateUTC)
        output.push(attributes)

    }
    return output.sort((a, b) => (a.dateUTC > b.dateUTC) ? 1 : -1)
}

  
// articles is a array with all article names without the ending (.md)
// artcileAttributes is a array with json objects containing all attributes in the markdown file

let articles = readAllArticles();
//articles = fs.readdirSync(articlePath)

let articleAttributes = readAllAttributes();


function getRawData(data) {
    let closingBracket = data.indexOf('}');
    let attributes = data.substring(0, closingBracket + 1);
    return data.replace(attributes, '')
}

function getArticleAttributes(articleName) {
    for (let i = 0; i < articleAttributes.length; i++) {
        if (articleAttributes[i].name == articleName) {
            return articleAttributes[i]
        }
    }
    return 'Does not exist'
}

// app.get('/blog', urlencodedparser, async function(req, res) {
//     logger.log(req)
//     articleAttributes.sort((a, b) => (a.dateUTC > b.dateUTC) ? 1 : -1)
//     articleAttributes.reverse()
//     //console.log(req.query.article)
//     if (req.query.article === undefined) {
//         res.render('blog', {articleAttributes: articleAttributes})
//     } else {
//         let searchResult = articles.find(element => element == req.query.article)
//         if (searchResult === undefined) {
//             res.send('Sorry but your article does not exist')
//         } else {
//             fs.readFile('./blog/' + req.query.article + '.md', 'utf8' , async function(err, data) {
//                 if (err) {
//                   console.error(err)
//                   return
//                 }
//                 //console.log(articleAttributes)
//                 let attributes = getArticleAttributes(searchResult)
//                 let articleHTML = converter.makeHtml(getRawData(data))
//                 res.render('article', {content: articleHTML, attributes: attributes})
//               })   
//         }   
//     }   
// });

app.get('/blog', urlencodedparser, async function(req, res) {
    articleAttributes.sort((a, b) => (a.dateUTC < b.dateUTC) ? 1 : -1)
    
//     articleAttributes.reverse()
    if (req.query.article === undefined) {
        res.render('blog', {articleAttributes: articleAttributes})
    } else {
        request(`${serverConnections.blogServer}/article/${req.query.article}`, (err, body) => {
            let attributes = getArticleAttributes('rekursion')
            // res.send(body.body)
            res.render('article', {content: body.body, attributes: attributes})
            
        });
    }
})

module.exports = {articleAttributes}
