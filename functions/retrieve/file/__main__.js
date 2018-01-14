const lib = require('lib')({token: process.env.STDLIB_LIBRARY_TOKEN});

/**
* get storage 
* @param {string} key
* @returns {buffer}
*/
module.exports = (key, callback) => {
    lib.utils.storage.get(key)
    .then(value => {
        let picInfo = JSON.parse(value);
        callback(null, new Buffer(picInfo.data,'base64'));
    })
    .catch(err => {
        callback(err);
    })
};