const fs = require('fs')

app.get('/sitemap', function(req,  res){
    //console.log(req);
    res.send('sitemap.xml')
});