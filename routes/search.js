let logger = require('../logger.js')
let fs = require('fs');
const request = require('request');
let Fuse = require('fuse.js');
let html2json = require('html2json').html2json;

const fuseOptions = {
    // isCaseSensitive: false,
    includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    findAllMatches: true,
    minMatchCharLength: 1,
    location: 0,
    threshold: 0.3,
    keys: [
        'name',
        'element',
        'title',
        'description',
        'name',
        'dateReadable',
        'page',
        'url',
        'time',
        'type'
    ]
};


async function getCV() {
    // get cv from database
    let cvContent = await connection.asyncquery('SELECT * FROM website.CV');
    return cvContent;
}

async function getPages() {
    // get pages from database
    return [
        {
            "name": "Main Page",
            "description": "This is the main page where you probably started from",
            "page": "/"
        },
        {
            "name": "Blog Page",
            "description": "This is my personal blog where you can find articles mostly about tech-related topics",
            "page": "/blog"
        },
        {
            "name": "Podcast Page",
            "description": "Did you know that I have a podcast? Here you can listen to the newest episodes.",
            "page": "/podcast"
        },
        {
            "name": "CV Page",
            "description": "This is my CV, so you can see all the steps in my life",
            "page": "/cv"
        },
        {
            "name": "Contact Page",
            "description": "This is the contact page where you can find contact information or even the possiblity to send me messages directly.",
            "page": "/contact"
        },
        {
            "name": "Imprint Page",
            "description": "Pretty boring but here is the imprint",
            "page": "/imprint"
        },
        {
            "name": "Papers",
            "description": "Al my scientific works collected in one place",
            "page": "/papers"
        }
    ];
}

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

app.get('/search/:text', urlencodedparser, async function(req, res) {
    if (req.params.text == '') {
        res.send('');
        return;
    }

    const cvContent = await getCV();
    const cvSearch = new Fuse(cvContent, fuseOptions).search(req.params.text);

    const pages = await getPages();
    const pagesSearch = new Fuse(pages, fuseOptions).search(req.params.text);

    const topHitSearch = new Fuse([...cvContent, ...pages], fuseOptions).search(req.params.text);
    let topHit = undefined
    if (topHitSearch.length > 0) {
        topHit = topHitSearch[0].item;
    }

    let inCV = [];
    if (isNumeric(req.params.text)) {
        let date = parseInt(req.params.text);
        for (let i = 0; i < cvContent.length; i++) {
            if (cvContent[i].begin <= date && cvContent[i].end >= date) {
                inCV.push(cvContent[i])
            } else if (cvContent[i].begin <= date && cvContent[i].end == -1) {
                inCV.push(cvContent[i])
            }
        }
    }

    let searchResults = {
        searchTerm: req.params.text,
        inCV: inCV,
        topHit: topHit,
        search: [
            {
                name: 'CV',
                data: cvSearch
            },
            {
                name: 'Pages',
                data: pagesSearch
            }
        ]
    }

    console.log(cvSearch[0])


    res.render('searchOutput', searchResults)

})

app.get('/suggestion', urlencodedparser, async function(req, res) {

    let cvContent = await getCV()
    let pages = await getPages()

    let allItems = [...cvContent, ...pages]
    console.log(allItems)
    // shuffel array
    for (let i = allItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allItems[i], allItems[j]] = [allItems[j], allItems[i]];
    }

    let suggestions = [{
        // random number between 2001 and 2022
        name: Math.floor(Math.random() * (2022 - 2001 + 1) + 2001),
    }]
    // get first 5 items
    for (let i = 0; i < 4; i++) {
       suggestions.push({name: allItems[i].name})
    }

    res.render('suggestionsOutput', {suggestions})

})

module.exports = {app}