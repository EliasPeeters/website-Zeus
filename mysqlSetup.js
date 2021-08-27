let mysql = require('mysql');
let util2 = require('util2');


function getConnection() {
    
    let connection = mysql.createConnection({
        host: credentials.mysqlDatabase.url,
        user: 'website',
        password: credentials.mysqlDatabase.user.website,
        database: 'website'
    });
    
    connection.connect((err) => {
        if (err) {
            console.log(err);
            console.log('\x1b[33m%s\x1b[0m', `NOT CONNECTED TO DATABASE!`);
            return false
        } else {
            console.log('\x1b[36m%s\x1b[0m', 'Conntected to Database');
            return true
        }
    });

    connection.asyncquery = util2.promisify(connection.query).bind(connection);

    connection.removeTableNameFromArray = function(inputArray) {
        for (let i = 0; i < inputArray.length; i++) {
            if (inputArray[i] == 'table') {
                inputArray.splice(i, 1)
            }
        }
        return inputArray
    }
    
    connection.createQueryStringFromObject = function(inputObject) {
        let allKeys = connection.removeTableNameFromArray(Object.keys(inputObject));
    
        let query = '';
        query += 'INSERT INTO ';
        query += inputObject.table;
        query += ' ('
        for (let i = 0; i < allKeys.length; i++) {
            if (i == allKeys.length - 1) {
                query += allKeys[i] + ')'
            } else {
                query += allKeys[i] + ', '
            }
        }
        query += ' VALUES '
        query += '('
        for (let i = 0; i < allKeys.length; i++) {
            if (i == allKeys.length - 1) {
                query += mysql.escape(inputObject[allKeys[i]]) + ')'
            } else {
                query += mysql.escape(inputObject[allKeys[i]]) + ', '
            }
        }
        return query
    }

    return connection;    
}

module.exports = {getConnection}