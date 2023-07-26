const express = require('express');
const multer = require('multer');
const DocumentUploader = require('./DocumentUploader');
const DocumentValidator = require('./DocumentValidator');
const DocumentEncryptor = require('./DocumentEncryptor');
const DocumentDecryptor = require('./DocumentDecryptor');
const DocumentAnalyzer = require('./DocumentAnalyzer');

const app = express();
const upload = multer();

app.post('/upload', upload.single('file'), (req, res) => {
  const documentUploader = new DocumentUploader();
  documentUploader.uploadDocument(req.file)
    .then(() => res.send('File uploaded successfully'))
    .catch(err => res.status(500).send(err.message));
});

app.listen(3000, () => console.log('Server started on port 3000'));
