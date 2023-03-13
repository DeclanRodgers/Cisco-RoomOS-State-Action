const axios = require('axios');
const urlConcat = require('../../lib/urlconcat')

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
          console.log(`Axios error with device ${deviceid}:\n${error.stack}`);
        }
    });
    }catch(error){
      console.log(`Error occured written:\n${error.stack}`);
    };
  }
  
  module.exports = {SendPostCommand};