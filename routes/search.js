let logger = require('../logger.js')
let Fuse = require('fuse.js');
let fs = require('fs');
let htmltojson = require('html-to-json')

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

app.get('/search', urlencodedparser, function(req,  res){
    let searchString = req.query.text
    const cvSearch = new Fuse(cvArray, options).search(searchString);
    
    const blogSearch = new Fuse(blogArray, options).search(searchString);
    const pagesSearch = new Fuse(pagesArray, options).search(searchString);
    const contentSearch = new Fuse(blogContentArray, options).search(searchString);

    res.render('searchOutput', 
    {
        blogSearch: blogSearch, 
        cvSearch: cvSearch,
        pagesSearch: pagesSearch,
        contentSearch: contentSearch,
    })
    logger.log(req);
});

app.get('/searchTest', urlencodedparser, function(req, res){
    let data = fs.readFileSync('./blog/website.md', {encoding:'utf8', flag:'r'})
    //console.log(data);
    let data2= htmltojson.parse('<h1>Test</h1>');

    data2.done(function (result){
        console.log(result)
    })

    var promise = htmltojson.parse(data, {
        'text': function ($doc) {
          return $doc.find('div').text();
        }
      }, function (err, result) {
        console.log(result);
      });
       

    res.send(req.query.text)
});

module.exports = {app}