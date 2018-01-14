let atob = require('atob');
const lib = require('lib')({token: process.env.STDLIB_LIBRARY_TOKEN})
let md5 = require("crypto").createHash('md5');

function validateRoom() {
    return true;
}

function base64Decode(base64Str) {
    return new Promise(resolve => {
        resolve(atob(base64Str));
    })
} 

function lookUpMSCV (pic, params = {visualFeatures:["Categories"]}) {
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
    
    return axios.post(url, pic.toString('bianry'), {
        headers: {
        //   'Content-Disposition': 'attachment; filename="picture.jpg"',
          'Content-Type': 'image/jpeg',
          'Ocp-Apim-Subscription-Key': process.env.MS_COGNITIVE_IMG_KEY
        }
    });
}

function genPicID (picBase64) {
    return new Promise(resolve => {
        resolve(md5.update(picBase64).digest("hex"));
    })
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

    base64Decode(picBase64)
    .catch(err => {
        // callback(err)
        callback(new Error("invalid base64 string"));
    })
    .then(pic => {
        // if (pic.length < process.env.MAX_PIC_SIZE_TO_MSCV){
        //     return lookUpMSCV(pic);
        // }
        return {}
    })
    .catch(err => {
        // callback(null, {
        //     success: true,
        //     message: "failed to request MSCV"
        // })
        callback(err);
    })


    genPicID(picBase64)
    .then(picID => {
        return Promise.resolve(lib.utils.storage.set(picID, picBase64))
        .then(() => {
            return picID
        })
    })
    .then((picID) => {
        callback(null, 
            {
                success: true,
                data: picID
            }
        );
    })
};
  