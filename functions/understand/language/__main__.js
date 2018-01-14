let rp = require('request-promise')

function recognizeLanguageType(content) {
    let options = {
        method: 'POST',
        uri: process.env.MS_COGNITIVE_TXT_ADDR + "languages",
        body: {
            "documents": [
                {
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
* detect language type of given text
* @param {string} text 
* @returns {object}
*/
module.exports = (text, callback) => {
   recognizeLanguageType(text)
   .then(response => {
        callback(null,{
            type: response.documents[0].detectedLanguages[0].name,
            code: response.documents[0].detectedLanguages[0].iso6391Name 
        })
   })
   .catch(err => {
       callback(err)
   })
}