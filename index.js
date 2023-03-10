const Fs = require('fs');
const CsvReadableStream = require('csv-reader');
const endpointActions = require('./macros/macro1/endpointactions');
const core = require('@actions/core');
const github = require('@actions/github')

var SECRET_TOKEN = Fs.readFileSync(__dirname+"\\textfiles\\secret.txt").toString();
console.log(`Secret:${SECRET_TOKEN}`);

let inputCSV = __dirname+'/destinations.csv';

// Check that the file exists 
if(!Fs.existsSync(inputCSV)) {
    console.log("File not found");
} else {
    let inputStream = Fs.createReadStream(inputCSV, 'utf8');
    OutputContents(inputStream);
}

function OutputContents(inputStream){
    let dataPresent = false;
    inputStream
        .pipe(new CsvReadableStream({ delimiter: ',', parseNumbers: true, parseBooleans: true, trim: true }))
        .on('data', function (row) {
            dataPresent = true;
            console.log(`Row:${row}`);                        
        })
        .on('end', function () {
            if(dataPresent){
                console.log('\nNo more rows!');
            } else{
                console.log('No rows in file.');
            }            
        });
}