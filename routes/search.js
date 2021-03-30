let logger = require('../logger.js')
let Fuse = require('fuse.js');

let blog = require('./blog.js')


function createBlogArray() {
    console.log(blog.articles)
}

let searchArray = createBlogArray();

let blogArray = [
    {name: 'first website', type: 'article'}, 
    {name: 'Beispiel', type: 'article'}];

let cvArray = [
    {element: 'education', 
    element: 'beispiel3'}
]

const options = {
    // isCaseSensitive: false,
    includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    minMatchCharLength: 1,
    // location: 0,
    threshold: 0.3,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    keys: [
        'name',
        'element'
    ]
};



app.get('/search', urlencodedparser, async function(req,  res){
    let searchString = req.query.text
    const cvSearch = new Fuse(cvArray, options).search(searchString);

    const blogSearch = new Fuse(blogArray, options).search(searchString);
    console.log(cvArray)
    

    res.render('searchOutput', {blogSearch: blogSearch, cvSearch: cvSearch})
    logger.log(req);
    
    console.log(blogSearch)
    console.log(cvSearch)
});