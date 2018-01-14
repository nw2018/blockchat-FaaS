const lib = require('lib')({token: process.env.STDLIB_LIBRARY_TOKEN})


/**
* test storage
* @param {string} key
* @param {string} val
* @returns {object}
*/
module.exports = (key, val, callback) => {
    lib.utils.storage.set(key, val)
    .then(value => {
        callback(null, {
            success: true
        })
    })
    .catch(err => {
        callback(err)
    })
};
  