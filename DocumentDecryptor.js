const CryptoJS = require('crypto-js');

class DocumentDecryptor {
  async decryptDocument(file) {
    const bytes  = CryptoJS.AES.decrypt(file, 'secret key 123');
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  }
}

module.exports = DocumentDecryptor;
