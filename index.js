const Fs = require('fs');
const extractor = require('./lib/ExtractCSVContents');
const macro1 = require('./macros/macro1/getrequest');
const macro2 = require('./macros/macro2/postrequest');
const core = require('@actions/core');
const github = require('@actions/github')

let tokenData = core.getInput('token-data');
let apiEndpoint = core.getInput('api-endpoint');
let destinationsCSV = __dirname+'/destinations.csv';
let commandsCSV = __dirname+'/commands.csv';

async function main(){
    // Check that the file(s) exists 
    if(!Fs.existsSync(destinationsCSV) || !Fs.existsSync(commandsCSV)) {
        console.log("Destinations or Commands file not found");
    } else {        
        let deviceArray = await extractor.ExtractContents(destinationsCSV);        
        console.log("Returned Devices Array:\n",deviceArray);
        console.log('\n');
        let commandArray = await extractor.ExtractContents(commandsCSV);
        console.log("Returned Command Array:\n",commandArray);
        console.log('\n');
        OutputCalls(deviceArray, commandArray);
    }
}

async function OutputCalls(deviceArray, commandArray){
    console.log('** GET Calls **')    
    for(i = 0; i < deviceArray.length; i++){
        console.log(`GET Request for device: ${deviceArray[i]}`)
        await macro1.SendGetCommand(deviceArray[i], tokenData, apiEndpoint)
    };
    
    console.log('\n** POST Calls **')
    for(i = 0; i < deviceArray.length; i++){
        for(j = 0; j < commandArray.length; j++){
            console.log(`POST Request for device: ${deviceArray[i]} with command ${commandArray[j]}`)
            await macro2.SendPostCommand(deviceArray[i], commandArray[j], tokenData, apiEndpoint);
        };
    };
}

main();
