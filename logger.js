let loggerEnable = (process.env.LOGGER=="true") ? true : false;

if (loggerEnable) {
    console.log('Logger enabled')
} else {
    console.log('Logger disabled')
}

async function log(req, messageID = -1) {
    if (loggerEnable) {
        console.log(new Date())
    }
}

module.exports = {log}