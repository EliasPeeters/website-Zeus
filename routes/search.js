let logger = require('../logger.js')
let Fuse = require('fuse.js');
let fs = require('fs');
let htmltojson = require('html-to-json')
const request = require('request');

let blog = require('./blog.js')


function createBlogArray() {
    let articles = blog.articleAttributes
    for (let i = 0; i < articles.length; i++) {
        articles[i].url = '/blog?article=' + articles[i].name
    }
    return articles
}

function createBlogContentArray() {
    let articles = blog.articleAttributes;
    for (let i = 0; i < articles.length; i++) {
        let data = fs.readFileSync('./blog/' + articles[i].name + '.md', {encoding:'utf8', flag:'r'})
        articles[i].data = data;
    }
    return articles
}

// let blogArray = createBlogArray();
// let blogContentArray = createBlogContentArray();
let blogContentArray = []
let blogArray = []

//blogArrayconsole.log(blogArray)

let cvArray = [
    {element: 'education', 
    element: 'beispiel3'}
]

let pagesArray = [
    {
        page: 'contact', 
        url: '/contact'
    },
    {
        page: 'CV', 
        url: '/cv'
    },
    {
        page: 'main', 
        url: '/'
    },
    {
        page: 'blog', 
        url: '/blog'
    }
]

const options = {
    // isCaseSensitive: false,
    includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    findAllMatches: true,
    minMatchCharLength: 1,
    location: 0,
    threshold: 0.3,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    keys: [
        'name',
        'element',
        'title',
        'description',
        'name',
        'dateReadable',
        'page',
        'url'
    ]
};


app.get('/search/:text', urlencodedparser, function(req, res) {
    if (req.params.text == '') {
        res.send('');
        return;
    }

    request(`${serverConnections.hermes.address}/search/${req.params.text}`, (err, result, body) => {
        if (err) { 
            return console.log(err); 
        }
        res.send(body)
    });
})

module.exports = {app}