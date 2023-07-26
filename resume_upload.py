from flask import Flask, request
from werkzeug.utils import secure_filename
import PyPDF2
import textract
import os

class ResumeUpload:

    def __init__(self):
        self.app = Flask(__name__)
        self.app.config['UPLOAD_FOLDER'] = './uploads'
        self.allowed_extensions = set(['pdf'])

    def allowed_file(self, filename):
        return '.' in filename and \
               filename.rsplit('.', 1)[1].lower() in self.allowed_extensions

    def handle_upload(self):
        if request.method == 'POST':
            if 'file' not in request.files:
                return 'No file part'
            file = request.files['file']
            if file.filename == '':
                return 'No selected file'
            if file and self.allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file.save(os.path.join(self.app.config['UPLOAD_FOLDER'], filename))
                return self.parse_resume(filename)
            else:
                return 'Invalid file type'

    def parse_resume(self, filename):
        text = ''
        with open(os.path.join(self.app.config['UPLOAD_FOLDER'], filename), 'rb') as f:
            pdf = PyPDF2.PdfFileReader(f)
            for page in range(pdf.getNumPages()):
                text += pdf.getPage(page).extractText()
        if text == '':
            text = textract.process(os.path.join(self.app.config['UPLOAD_FOLDER'], filename), method='tesseract', language='eng')
        return text
