const Fs = require('fs');
const CsvReadableStream = require('csv-reader');

async function ExtractContents(csvFilePath){
    var inputStream = Fs.createReadStream(csvFilePath, 'utf8');
    let dataPresent = false;
    var deviceArray = new Array();
    await new Promise ((resolve,reject)=>{
        inputStream
            .pipe(new CsvReadableStream({ delimiter: ',', skipEmptyLines: true, parseNumbers: true, parseBooleans: true, trim: true }))
            .on('data', function (row) {
                dataPresent = true;
                let device = row.toString();
                if(device.charAt(0) !='#' && device.charAt(0) != ''){  //disregard lines starting with '#' or blanks (skipEmptyLines doesnt work)
                    deviceArray.push(device);
                }                                        
            })        
            .on('end', function () {
                if(!dataPresent){
                    console.log('File empty.');
                    reject();
                } else {                    
                    resolve();                    
                }    
            });
    });
    if (deviceArray.length < 1){
        throw new Error(`File '${csvFilePath}' contains no data or is in incorrect format.`);            
    }
    return deviceArray;
}

module.exports = {ExtractContents};