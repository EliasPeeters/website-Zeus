const { app } = require('./search');

var request = require('sync-request');

app.post('/heraCreatePdf', (req, res) => {
    console.log(req.body)
    let queryString = '?';
    for (element in req.body) {
        queryString += `${element}=${req.body[element]}&`
    }
    console.log(queryString)
    var result = JSON.parse(request('GET', `${serverConnections.hera.address}/createpdf${queryString}`).getBody('utf-8'));
    res.redirect(`/article?name=${req.query.name}&task=${result.task}&solution=${result.solution}`)
})

app.get('/pdfModal', (req, res) => {
    let url = `${serverConnections.zeus.address}/heraCreatePdf`;
    
    res.render('partials/numeralSystemTaskCreator', {url: url})
})

app.get('/pdfOutput', (req, res) => {
    console.log(req.query)
    res.render('partials/numeralSystemTaskOutput', {output: req.query})
})