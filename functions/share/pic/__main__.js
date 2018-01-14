
function validateRoom() {
    return true;
}

function base64Decode(base64Str) {
    return new Promise(resolve => {
        resolve(pic = atob(base64Str))
    })
} 

function genPicID (pic) {

}

function lookUpMSCV (pic) {
    
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
    .then(pic => {
        if (pic.size < MAX_PIC_SIZE_TO_MSCV){
            callback(null, 
                {
                    success: true,
                    message: "pic size < 4mb"
                }
            )
        }
    })
    .catch(err => {
        callback(new Error("invalid base64 string"))
    })
};
  