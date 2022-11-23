const request = require('request');

function checkAllConnections() {
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
}

module.exports = {checkAllConnections}