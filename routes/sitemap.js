const fs = require('fs')

app.get('/sitemap', function(req,  res){
    res.redirect('/static/sitemap.xml')
});