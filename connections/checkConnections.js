const request = require('request');

function checkAllConnections() {
    // Hera Connection
    request(serverConnections.hera.address, (err, res, body) => {
        if (err) { 
            console.log('\x1b[33m%s\x1b[0m', `NOT CONNECTED TO PDF CREATOR (HERA)!`)
        }
        if (body == 'Success') {
            console.log('\x1b[36m%s\x1b[0m', `Connected to pdf Creator (hera)`)
        }
    });

    // Hermes Connection
    request(serverConnections.hermes.address, (err, res, body) => {
        if (err) { 
            console.log('\x1b[33m%s\x1b[0m', `NOT CONNECTED TO SEARCH (HERMES)!`)
        } else {
            if (body == 'Success') {
                console.log('\x1b[36m%s\x1b[0m', `Connected to search (hermes)`)
            }
        }
    });

    // Ares Connection
    request(serverConnections.ares.address, (err, res, body) => {
        if (err) { 
            console.log('\x1b[33m%s\x1b[0m', `NOT CONNECTED TO PAPERS (ARES)!`)
        } else {
            if (body == 'Success') {
                console.log('\x1b[36m%s\x1b[0m', `Connected to papers (ares)`)
            }
        }
    });

    // Apollon Connection
    request(serverConnections.apollon.address, (err, res, body) => {
        if (err) { 
            console.log('\x1b[33m%s\x1b[0m', `NOT CONNECTED TO TELEGRAM (APOLLON)!`)
        } else {
            if (res.statusCode == 200) {
                console.log('\x1b[36m%s\x1b[0m', `Connected to telegram (apollon)`)
            } else {
                console.log('\x1b[33m%s\x1b[0m', `NOT CONNECTED TO TELEGRAM (APOLLON)!`)
            }
        }
    });
}

module.exports = {checkAllConnections}