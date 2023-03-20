const Fs = require('fs');
const CsvReadableStream = require('csv-reader');

async function ExtractContents(csvFilePath){
    var inputStream = Fs.createReadStream(csvFilePath, 'utf8');
    let dataPresent = false;
    var deviceArray = new Array();
    try{
        await new Promise ((resolve,reject)=>{
            inputStream
                .pipe(new CsvReadableStream({ delimiter: ',', parseNumbers: true, parseBooleans: true, trim: true }))
                //.filter() filter based on hashtag at beggining of line
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
        return resultArray;
    } catch(err){
        console.error(`The following error occured with file '${csvFilePath}':\n ${err}`);
    };
}

function CheckLineStart(row){
    console.log(`Row:${row}, first char:'${row.charAt(0)}'`);
    if(row.charAt(0) !='#'){
        console.log("Success!")
        return row;
    }
}

module.exports = {ExtractContents};