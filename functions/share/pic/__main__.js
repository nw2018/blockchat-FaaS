let axios = require('axios')
let atob = require('atob')
let FormData = require('form-data');

function validateRoom() {
    return true;
}

function base64Decode(base64Str) {
    return new Promise(resolve => {
        resolve(pic = atob(base64Str))
    })
} 

function lookUpMSCV (pic, params = {visualFeatures:["Categories"]}) {
    let url = process.env.MSCV_ADDR
    let i = 0
    Object.entries(params).forEach(([key, value]) => {
        if (i == 0) {
            url += "?" + key + "="
        }
        else{
            url += "&" + key + "="
        }
        i++;
        for (var j = 0; j < value.length; j++) {
            url += value[j]
        }
    });
    
    return axios.post(url, pic.toString('bianry'), {
        headers: {
        //   'Content-Disposition': 'attachment; filename="picture.jpg"',
          'Content-Type': 'image/jpeg',
          'Ocp-Apim-Subscription-Key': process.env.MSCV_KEY
        }
    });
}

function genPicID (pic) {

}

/**
* for share picture in a room 
* @param {string} roomID 
* @param {string} picBase64
* @returns {object}
*/
module.exports = (roomID, picBase64, callback) => {
    if (!validateRoom(roomID)){
        callback(new Error("invalid room id"))
    }

    base64Decode(picBase64)
    .catch(err => {
        // callback(err)
        callback(new Error("invalid base64 string"))
    })
    .then(pic => {
        callback(null, pic.toString('binary'))
        if (pic.length < process.env.MAX_PIC_SIZE_TO_MSCV){
            return lookUpMSCV(pic)
        }
    })
    .then((response) => {
        callback(null, 
            {
                success: true,
                message: response 
            }
        )
    })
    .catch(err => {
        // callback(null, {
        //     success: true,
        //     message: "failed to request MSCV"
        // })
        callback(err)
    })

};
  