let request = require('request');

app.get('/papers', (req, res) => {
    request(`${serverConnections.ares.address}/attributes`, (err, body) => {
        let papers = JSON.parse(body.body);
        res.render('papers', {papers: papers})
        // res.send(articleAttributes)
    });
})

app.get('/papers/:paper', (req, res) => {
    request(`${serverConnections.ares.address}/paper/${req.params.paper}`, (err, body) => {
        if (body.body == "Paper does not exist") {
            res.redirect('/404')
        } else {
            let paper = JSON.parse(body.body);
            res.render('paper', {paper})
        }
        // res.send(articleAttributes)
    });
})

app.get('/onePaper', (req, res) => {
    request(`${serverConnections.ares.address}/paper/${req.query.name}`, (err, body) => {
        if (body.body == "Paper does not exist") {
            res.redirect('/404')
        } else {
            let paper = JSON.parse(body.body);
            res.render('paper', {paper})
        }
        // res.send(articleAttributes)
    });
})