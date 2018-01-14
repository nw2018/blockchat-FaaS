const lib = require('lib')({token: process.env.STDLIB_LIBRARY_TOKEN});

/**
* get storage 
* @param {string} key
* @returns {object}
*/
module.exports = (key, callback) => {
    lib.utils.storage.get(key)
    .then(value => {
        let picInfo = JSON.parse(value);
        callback(null, {
            success: true,
            data: picInfo.data,
            description: picInfo.description
        });
    })
    .catch(err => {
        callback(err);
    })
};
  