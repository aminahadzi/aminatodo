const crypto = require('crypto');
const SECRET_KEY = "Th1sAs3creT";
const ENCODING = 'hex';

function encrypt(text){
    const cipher = crypto.createCipher('des-ede3-cbc', SECRET_KEY);
    let retVal = cipher.update(text, 'utf8', ENCODING);
    retVal += cipher.final(ENCODING);
    console.log("Crypted Text:", retVal);
    return retVal;
}

function decrypt(text){
    const decipher = crypto.createDecipher('des-ede3-cbc', SECRET_KEY);
    let retVal = decipher.update(text, ENCODING, 'utf8');
    retVal += decipher.final('utf8');
    console.log("Decrypted Text:", retVal);
    return retVal;
}

module.exports = {
    "encrypt": encrypt,
    "decrypt": decrypt
};
