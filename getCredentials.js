let fs = require('fs');
const homedir = require('os').homedir();

function getCredentials() {
    let file = JSON.parse(fs.readFileSync(`${homedir}/credentials.json`));
    console.log('Loaded credentials');
    return file;
}

module.exports = {getCredentials};