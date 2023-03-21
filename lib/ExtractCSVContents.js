const Fs = require('fs');
const CsvReadableStream = require('csv-reader');

async function ExtractContents(csvFilePath){
    var inputStream = Fs.createReadStream(csvFilePath, 'utf8');
    let dataPresent = false;
    var deviceArray = new Array();
    try{
        await new Promise ((resolve,reject)=>{
            inputStream
                //.pipe(new CsvReadableStream({ delimiter: ',', parseNumbers: true, parseBooleans: true, trim: true }))
                .pipe(new CsvReadableStream({ delimiter: ',', parseNumbers: true, parseBooleans: true, trim: true, skipEmptyLines: true, multiline: true }))
                .on('data', function (row) {
                    dataPresent = true;
                    let device = row.toString();
                    deviceArray.push(device);
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
        var resultArray = deviceArray.filter(CheckLineStart);
        if (resultArray.length < 1){
            throw new Error('- File contains no data or is in incorrect format.');            
        }
        return resultArray;
    } catch(err){
        console.error(`The following error occured with file '${csvFilePath}':\n ${err.message}`);
        process.exit();
    };
}

function CheckLineStart(row){
    if(row.charAt(0) !='#'){
        return row;
    }
}

module.exports = {ExtractContents};