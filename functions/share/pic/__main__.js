const lib = require('lib')({token: process.env.STDLIB_LIBRARY_TOKEN});
let crpyto = require("crypto")
let request = require('request-promise')

function validateRoom() {
    return true;
}

function lookUpMSCV (picID , params = {}) {
    let url = process.env.MS_COGNITIVE_IMG_ADDR;
    let i = 0;
    Object.entries(params).forEach(([key, value]) => {
        if (i === 0) {
            url += "?" + key + "=";
        }
        else{
            url += "&" + key + "=";
        }
        i++;
        for (let j = 0; j < value.length; j++) {
            url += value[j];
        }
    });
    
    let options = {
        method: "POST",
        uri: url,
        body: {
           "url": 'https://blockchat.lib.id/blockchat@dev/retrieve/file/?key=' + picID
        },
        headers: {
            'Ocp-Apim-Subscription-Key': process.env.MS_COGNITIVE_IMG_KEY
        },
        json: true
    }

    return request(options);
}

function genPictureID (picBase64) {
    return new Promise(resolve => {
        resolve(crpyto.createHash('md5').update(picBase64).digest("hex"));
    })
}

function parseDescription (tags, captions) {
    let max = -1;
    tags = tags.length <= 5 ? tags: tags.slice(0, 5);
    for (let i = 0; i < captions.length; i++) {
        if (captions[i].confidence > max){
            max = captions[i].confidence
            captions = captions[i].text
        }
    }
    return {
        tags: tags,
        captions: captions 
    } 
}

/**
* for share picture in a room 
* @param {string} roomID 
* @param {string} picBase64
* @returns {object}
*/
module.exports = (roomID, picBase64, callback) => {
    if (!validateRoom(roomID)){
        callback(new Error("invalid room id"));
    }

    let pidID = null;

    genPictureID(picBase64)
    .then(id => {
        pidID = id;
        return lib.utils.storage.set(pidID, picBase64);
    })
    .then(() => {
        return lookUpMSCV(pidID)
    })
    .then((response) => {
        callback(null, {
            description: parseDescription(response.description.tags, response.description.captions)
        })
    })
    .catch(err => {
        callback(err);
    })
};
  