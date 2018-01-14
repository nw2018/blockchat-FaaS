let rp = require('request-promise')

function recognizeSementic(content, language) {
    let options = {
        method: 'POST',
        uri: process.env.MS_COGNITIVE_TXT_ADDR,
        body: {
            "documents": [
                {
                  "language": language,
                  "id": 1,
                  "text": content
                }
            ]
        },
        headers: {
            "Ocp-Apim-Subscription-Key": process.env.MS_COGNITIVE_TXT_KEY
        },
        json: true // Automatically stringifies the body to JSON
    }
    return rp(options);
}

/**
* for detect sementic in a room
* @param {string} text 
* @param {string} language
* @returns {object}
*/
module.exports = (text, language = 'en', callback) => {
   recognizeSementic(text, language)
   .then(response => {
        callback(null, {
           score: response.documents.score
        })
   })
   .catch(err => {
       callback(err)
   })
}