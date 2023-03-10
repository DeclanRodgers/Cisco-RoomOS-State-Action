const Fs = require('fs');
const CsvReadableStream = require('csv-reader');
const endpointActions = require('./macros/macro1/endpointactions');
const core = require('@actions/core');
const github = require('@actions/github')

let tokenData = Fs.readFileSync(__dirname+"\\textfiles\\secret.txt").toString();
//let tokenData = core.getInput('token-data');
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
            //console.log(`Row:${row}`);
            endpointActions.SendGetCommand(row, tokenData);
        })
        .on('end', function () {
            if(!dataPresent){
                console.log('No rows in file.');
            }      
        });
}