/**
* A basic Hello World function
* @returns {buffer}
*/
module.exports = (callback) => {

  callback(null, 
    new Buffer(`This is the API for BlockChat, for more information visit <a href="">blockchat.com</a>`),
    {'Content-Type': 'text/html; charset=utf-8'}
  );
};
