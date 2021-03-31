const assert = require('chai').assert;
const indexFile = require('../index')

describe('MySQL test', function () {
    it('check the sql connection', async function () {
        let result = await indexFile.checkMYSQLConnection();
        assert.equal(result, true)
    }); 

    it('check the sql insert Function', function () {
       let object = {
           table: 'test',
           name: 'hi'
       }
       let result = indexFile.connection.createQueryStringFromObject(object);
       assert.equal(result, 'INSERT INTO test (name) VALUES (\'hi\')')
   }); 
});
