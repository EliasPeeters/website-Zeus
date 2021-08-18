const request = require('request');

function checkAllConnections() {
    // Hades Connection
    request(serverConnections.blogServer.address, (err, res, body) => {
        if (err) { 
            console.log('\x1b[33m%s\x1b[0m', `NOT CONNECTED TO BLOGSERVER (HADES)!`)
        }
        if (body == 'Success') {
            console.log('\x1b[36m%s\x1b[0m', `Connected to blogServer (hades)`)
        }
    });

    // Hera Connection
    request(serverConnections.hera.address, (err, res, body) => {
        if (err) { 
            console.log('\x1b[33m%s\x1b[0m', `NOT CONNECTED TO PDF CREATOR (HERA)!`)
        }
        if (body == 'Success') {
            console.log('\x1b[36m%s\x1b[0m', `Connected to pdf Creator (hera)`)
        }
    });

    request(serverConnections.hermes.address, (err, res, body) => {
        if (err) { 
            console.log('\x1b[33m%s\x1b[0m', `NOT CONNECTED TO SEARCH (HERMES)!`)
        } else {
            if (body == 'Success') {
                console.log('\x1b[36m%s\x1b[0m', `Connected to search (hermes)`)
            }
        }
    });
}

module.exports = {checkAllConnections}