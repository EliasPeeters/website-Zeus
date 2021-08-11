const { app } = require('./search');

var request = require('sync-request');

app.post('/heraCreatePdf', (req, res) => {
    console.log(req.body)
    var result = JSON.parse(request('GET', 'http://hera.eliaspeeters.de/createpdf').getBody('utf-8'));
    res.redirect(`/pdfOutput?task=${result.task}&solution=${result.solution}`)
})

app.get('/pdfModal', (req, res) => {
    let url = `${serverConnections.zeus.address}/heraCreatePdf`;
    
    res.render('partials/numeralSystemTaskCreator', {url: url})
})

app.get('/pdfOutput', (req, res) => {
    console.log(req.query)
    res.render('partials/numeralSystemTaskOutput', {output: req.query})
})