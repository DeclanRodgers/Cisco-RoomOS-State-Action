const axios = require('axios');
const urlConcat = require('../../lib/urlconcat')

function SendGetCommand(deviceid, jwtToken){
  let apiEndpoint = "https://mpp.unifiedfx.com/api/devices/{id}?useDemo=true";
  let deviceEndpoint = urlConcat.ConcatenatePlaceholder(apiEndpoint, deviceid);

  console.log(`*** GET REQUEST *** \nEndpoint: ${deviceEndpoint}`);

  let headerConfig = {
    headers: {
        accept: 'text/plain',
        Authorization: 'Bearer '+jwtToken
    }
  };

  try{
    axios.get(deviceEndpoint, headerConfig).then(response =>{
        console.log(`\nGET Data recieved:\n${JSON.stringify(response.data, null, "\t")}`);
    }).catch(function(error){
        if(error.response){
            console.log(`Axios error:\n${error.stack}`);
        }
    });
  } catch (error) {
      fs.writeFileSync("logs/error.txt", error.stack);
      console.log("Error data written.");
  };
}

function SendPostCommand(deviceid, jwtToken, xCommand){
  let apiEndpoint = "https://mpp.unifiedfx.com/api/devices/{id}/command?useDemo=true";
  let deviceEndpoint = urlConcat.ConcatenatePlaceholder(apiEndpoint, deviceid);

  console.log(`*** POST REQUEST *** \nEndpoint: ${deviceEndpoint} \nCommand: ${xCommand}`);

  let bodyData = {
    "command": xCommand
  };

  let headerConfig = {
    headers: {
        accept: '*/*',
        ContentType: 'application/json',
        Authorization: 'Bearer '+jwtToken
    }
  };

  try{
    axios.post(deviceEndpoint, bodyData, headerConfig).then(response =>{
      console.log(`\nPOST Data recieved:\n${JSON.stringify(response.data, null, "\t")}`);
    }).catch(function(error){
      if(error.response){
        console.log(`Axios error:\n${error.stack}`);
      }
  });
  }catch(error){
    console.log(`Error occured written:\n${error.stack}`);
  };
}

module.exports = {SendGetCommand, SendPostCommand};