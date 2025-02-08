const crypto = require('crypto');
const secretKey = process.env.JWT_SECRET;

const encryptData = (data) => {
    const cipher = crypto.createCipher('aes-256-ctr', secretKey);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};

const decryptData = (encryptedData) => {
    const decipher = crypto.createDecipher('aes-256-ctr', secretKey);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

module.exports = { encryptData, decryptData };