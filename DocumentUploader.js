const DocumentValidator = require('./DocumentValidator');
const DocumentEncryptor = require('./DocumentEncryptor');

class DocumentUploader {
  async uploadDocument(file) {
    const documentValidator = new DocumentValidator();
    await documentValidator.validateDocument(file);

    const documentEncryptor = new DocumentEncryptor();
    const encryptedFile = await documentEncryptor.encryptDocument(file);

    // Logic for uploading the encrypted file to the server goes here
  }
}

module.exports = DocumentUploader;
