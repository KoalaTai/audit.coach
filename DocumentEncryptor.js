const CryptoJS = require('crypto-js');

class DocumentEncryptor {
  async encryptDocument(file) {
    const encrypted = CryptoJS.AES.encrypt(file.buffer.toString('utf8'), 'secret key 123');
    return encrypted.toString();
  }
}

module.exports = DocumentEncryptor;
