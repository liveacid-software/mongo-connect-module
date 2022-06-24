const mongodb = require('./mongodb');
const session = require('./session');

console.log('test');

module.exports = {
    client: mongodb.client,
    session: session.session
};