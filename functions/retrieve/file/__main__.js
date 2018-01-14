const lib = require('lib')({token: process.env.STDLIB_LIBRARY_TOKEN});

/**
* get storage 
* 
* @param {string} key
* @returns {buffer}
*/
module.exports = (key, callback) => {
    lib.utils.storage.get(key)
    .then(value => {
        callback(null, new Buffer(value,'base64'));
    })
    .catch(err => {
        callback(err);
    })
};