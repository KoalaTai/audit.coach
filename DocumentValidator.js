const fileType = require('file-type');

class DocumentValidator {
  async validateDocument(file) {
    const type = await fileType.fromBuffer(file.buffer);
    if (!['application/pdf', 'application/msword', 'text/plain'].includes(type.mime)) {
      throw new Error('Invalid file type');
    }

    // Additional validation logic goes here
  }
}

module.exports = DocumentValidator;
