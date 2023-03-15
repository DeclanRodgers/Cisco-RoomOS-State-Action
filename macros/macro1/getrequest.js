const axios = require('axios');
const urlConcat = require('../../lib/UrlConcat')

async function SendGetCommand(device, jwtToken){
  let apiEndpoint = "https://mpp.unifiedfx.com/api/devices/{id}?useDemo=true";
  let deviceEndpoint = urlConcat.ConcatenatePlaceholder(apiEndpoint, device);
  
  let headerConfig = {
    headers: {
        accept: 'text/plain',
        Authorization: 'Bearer '+jwtToken
    }
  };

  try{
    await axios.get(deviceEndpoint, headerConfig)
      .then(response =>{
        console.log(`\nGET Data Recieved for ${device}:\n${JSON.stringify(response.data, null, "\t")}`);
      }).catch(function(error){
        if(error.response){
          console.log(`\nAxios error with device ${device}:\n${error.stack}`);
        }
      });        
  } catch (error) {
      console.log("Error occured:\n", error.stack);
  };
}

module.exports = {SendGetCommand};
