const Fs = require('fs');
const CsvReadableStream = require('csv-reader');
const endpointActions = require('./macros/macro1/getrequest');
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
    ExtractContents(inputStream);
}

async function ExtractContents(inputStream){
    let dataPresent = false;
    var deviceArray = [];
    await inputStream
        .pipe(new CsvReadableStream({ delimiter: ',', parseNumbers: true, parseBooleans: true, trim: true }))
        .on('data', function (row) {
            dataPresent = true;
            //console.log(`Row:${row}`);
            //read from command > call endpoint for each command file
            //endpointActions.SendGetCommand(row, tokenData);
            //responseData = await endpointActions.SendGetCommand(row, tokenData);
            //console.log(responseData);
            let device = row.toString()
            console.log("Adding: ",device);
            deviceArray.push(device);
        })
        .on('end', function () {
            if(!dataPresent){
                console.log('File empty.');
            } else{
                console.log("Array:\n",deviceArray);
                OutputCalls(deviceArray);
            }    
        });
}

function OutputCalls(deviceArray){
    endpointActions.SendGetCommand(deviceArray, tokenData)

    // const promises = deviceArray.map((device) =>
    //     responseData = endpointActions.SendGetCommand(device, tokenData)
    // );
    // Promise.all([...promises]).then(function (values) {
    //     console.log(values);
    // });    
    
    // deviceArray.forEach(async device => {
    //     responseData = await endpointActions.SendGetCommand(device, tokenData);
    //     //console.log("DATA:\n",responseData);
    // });  
}