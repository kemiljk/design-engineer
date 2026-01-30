import fs from 'node:fs';
import pdf from 'pdf-parse';

const dataBuffer = fs.readFileSync('app/course/notes/ddccd5db-c068-4c07-aa5f-8b6bae52f25d.pdf');

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch((e) => console.log(e));
