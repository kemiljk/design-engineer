const fs = require('fs');
const pdfLib = require('pdf-parse');

const dataBuffer = fs.readFileSync('app/course/notes/ddccd5db-c068-4c07-aa5f-8b6bae52f25d.pdf');

// Try to find the function
const pdf = pdfLib.default || pdfLib;

if (typeof pdf === 'function') {
    pdf(dataBuffer).then(function(data) {
        console.log(data.text);
    }).catch(err => console.error(err));
} else {
    console.log('PDF export:', pdfLib);
}
