const lib = require('lib')({token: process.env.STDLIB_LIBRARY_TOKEN});
let btoa = require('btoa');

/**
* get storage 
* @param {string} key
* @returns {string}
*/
module.exports = (key, callback) => {
    lib.utils.storage.get(key)
    .then(value => {
        let picInfo = JSON.parse(value);
        callback(null, "data:image/png;base64,"+picInfo.data);
    })
    .catch(err => {
        callback(err);
    })
};