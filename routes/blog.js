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

let articles = readAllArticles();
console.log(readArticle[articles[0]])

app.get('/blog', urlencodedparser, async function(req, res) {

    //console.log(req.query.article)
    if (req.query.article == undefined) {
        res.send('test')
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
                let articleHTML = converter.makeHtml(data)
                res.send(articleHTML)
              })
    
            
        }
        
    }
    //console.log()
    
    
});