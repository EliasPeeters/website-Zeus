const request = require('request');

function checkAllConnections() {
    console.log('test');

    // Hades Connection
    request(serverConnections.blogServer.address, (err, res, body) => {
        if (err) { 
            return console.log(err); 
        }
        if (body == 'Success') {
            console.log('\x1b[36m%s\x1b[0m', `Connected to blogServer (hades)`)
        }
    });

    // Hera Connection
    request(serverConnections.hera.address, (err, res, body) => {
        if (err) { 
            return console.log(err); 
        }
        if (body == 'Success') {
            console.log('\x1b[36m%s\x1b[0m', `Connected to pdf Creator (hera)`)
        }
    });

}

module.exports = {checkAllConnections}