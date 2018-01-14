const lib = require('lib')({token: process.env.STDLIB_LIBRARY_TOKEN})


/**
* get storage 
* @param {string} key
* @returns {object}
*/
module.exports = (key, callback) => {
    lib.utils.storage.get(key)
    .then(value => {
        callback(null, {
            success: true,
            message: value
        })
    })
    .catch(err => {
        callback(err)
    })
};
  