let rp = require('request-promise')

//https://speech.googleapis.com/v1/speech:recognize?key=YOUR_API_KEY
function recognizeSpeech(content, language="en-US") {
    let options = {
        method: 'POST',
        uri: process.env.GOOGLE_SPEECHRECOG_ADDR,
        body: {
          "config": {
            "encoding": "LINEAR16",
            "sampleRateHertz": 16000,
            "languageCode": language,
            "enableWordTimeOffsets": false
          },
          "audio": {
            "content": content
          }
        },
        json: true // Automatically stringifies the body to JSON
    }
    return rp(options);
}

/**
* detect sentiment of given text 
* @param {string} audio 
* @param {string} language
* @returns {object}
*/
module.exports = (audio, language = 'en', callback) => {
   recognizeSpeech(audio, language)
   .then(response => {
        callback(null, response)
   })
   .catch(err => {
       callback(err)
   })
}