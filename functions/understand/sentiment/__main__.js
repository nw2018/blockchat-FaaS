let rp = require('request-promise')

function recognizeSentiment(content, language) {
    let options = {
        method: 'POST',
        uri: process.env.MS_COGNITIVE_TXT_ADDR + "sentiment",
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
* detect sentiment of given text 
* @param {string} text 
* @param {string} language
* @returns {object}
*/
module.exports = (text, language = 'en', callback) => {
   recognizeSentiment(text, language)
   .then(response => {
        callback(null, {
           score: response.documents[0].score
        })
   })
   .catch(err => {
       callback(err)
   })
}