const fs = require('fs')
const path = require('path');
const Showdown = require('showdown');


let converter = new Showdown.Converter()

const articlePath = './blog'

function readAllArticles() {
    let articles = fs.readdirSync(articlePath)
    for (let i = 0; i < articles.length; i++) {
        articles[i] = articles[i].replace('.md', '')
    }
    return articles
}

async function readArticle(name) {
    fs.readFile('./blog/' + name + '.md', 'utf8' , async function(err, data) {
        if (err) {
          console.error(err)
          return
        }
        console.log(converter.makeHtml(data))
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
        //console.log(attributes)
        let json = JSON.parse(attributes)
        return json
    }
}

function readAllAttributes() {
    let output = []
    for (let i = 0; i < articles.length; i++) {
        fs.readFile('./blog/' + articles[i] + '.md', 'utf8' , async function(err, data) {
            if (err) {
              console.error(err)
              return
            }
            let attributes = extractAttributes(data, articles[i])
            attributes.name = articles[i]
            output.push(attributes)
          })
    }
    return output
}

// articles is a array with all article names without the ending (.md)
// artcileAttributes is a array with json objects containing all attributes in the markdown file

let articles = readAllArticles();
let articleAttributes = readAllAttributes();
console.log(articleAttributes)
console.log(readArticle[articles[0]])



app.get('/blog', urlencodedparser, async function(req, res) {
    console.log(articleAttributes)
    //console.log(req.query.article)
    if (req.query.article == undefined) {
        res.render('blog', {articleAttributes: articleAttributes})
    } else {
        let searchResult = articles.find(element => element == req.query.article)
        console.log(searchResult)
        if (searchResult == undefined) {
            res.send('Sorry but your article does not exist')
        } else {
            fs.readFile('./blog/' + req.query.article + '.md', 'utf8' , async function(err, data) {
                if (err) {
                  console.error(err)
                  return
                }
                console.log(data)

                let articleHTML = converter.makeHtml(data)
                res.render('article', {content: articleHTML})
              })
            
        }
        
    }
        
});