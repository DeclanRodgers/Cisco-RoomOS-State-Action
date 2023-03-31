const Fs = require('fs');
const extractor = require('./lib/ExtractCSVContents');
const macro1 = require('./macros/macro1/getrequest');
const macro2 = require('./macros/macro2/postrequest');
const core = require('@actions/core');

// let tokenData = Fs.readFileSync(__dirname+'/textfiles/secret.txt');    //offline testing
// let apiEndpoint = "https://app.device-view.com/api/devices/{id}";     //offline testing
let tokenData = core.getInput('token-data');
let apiEndpoint = core.getInput('api-endpoint');
let destinationsCSV = __dirname+'/destinations.csv';
let commandsCSV = __dirname+'/commands.csv';

async function main(){
    // Check that the file(s) exists 
    if(!Fs.existsSync(destinationsCSV) || !Fs.existsSync(commandsCSV)) {
        core.error(`\tDestinations '${destinationsCSV}' or Commands ${commandsCSV} file not found`);
    } else {        
        try{
            let deviceArray = await extractor.ExtractContents(destinationsCSV);        
            let commandArray = await extractor.ExtractContents(commandsCSV);
            core.info(`CSV data extracted successfully`);
            OutputCalls(deviceArray, commandArray);
        } catch (err){
            core.setFailed(`\tError processing CSV files: ${err.message}`);
        }
    }
}

async function OutputCalls(deviceArray, commandArray){
    try{        
        core.info('\n** GET Calls **')
        //Iterates through array in reverse 
        for(var i = deviceArray.length - 1; i >= 0; i--){
            let deviceValid = false;
            core.info(`GET Request for device: ${deviceArray[i]}`);
            deviceValid = await macro1.SendGetCommand(deviceArray[i], tokenData, apiEndpoint);
            if (!deviceValid){                                
                deviceArray.splice(i, 1);
            };
            core.info("\n");
        };

        //Iterates in correct order with devices after verifying with GET
        if (deviceArray.length > 0){
            core.info('\n** POST Calls **')
            for(i = 0; i < deviceArray.length; i++){
                for(j = 0; j < commandArray.length; j++){
                    core.info(`POST Request for device: ${deviceArray[i]} with command(s):\n${commandArray[j]}`);
                    await macro2.SendPostCommand(deviceArray[i], commandArray[j], tokenData, apiEndpoint);
                    core.info('\n');
                };
            };
        } else {
            throw new Error("No devices valid for POST call.");
        }
    } catch(err){
        core.setFailed(`\tCall error: ${err.message}`);
    }
}

main();
