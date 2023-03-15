const axios = require('axios');
const urlConcat = require('../../lib/urlconcat')

async function SendPostCommand(device, xCommand, jwtToken){
  let apiEndpoint = "https://mpp.unifiedfx.com/api/devices/{id}/command?useDemo=true";
  let deviceEndpoint = urlConcat.ConcatenatePlaceholder(apiEndpoint, device);

  let headerConfig = {
    headers: {
        accept: '*/*',
        ContentType: 'application/json',
        Authorization: 'Bearer '+jwtToken
    }
  };

  let bodyData = {
    "command": xCommand
  };

  try{
    await axios.post(deviceEndpoint, bodyData, headerConfig)
      .then(response =>{
        console.log(`\nPOST Data recieved for ${device}:\n${JSON.stringify(response.data, null, "\t")}`);
      }).catch(function(error){
        if(error.response){
          console.log(`Axios error with device ${device}:\n${error.stack}`);
        }
    });
  } catch (error) {
    console.log(`Error occured:\n${error.stack}`);
  };
}
  
module.exports = {SendPostCommand};