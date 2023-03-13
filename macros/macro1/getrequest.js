const axios = require('axios');
const urlConcat = require('../../lib/urlconcat')

function SendGetCommand(deviceid, jwtToken){
  let apiEndpoint = "https://mpp.unifiedfx.com/api/devices/{id}?useDemo=true";
  let deviceEndpoint = urlConcat.ConcatenatePlaceholder(apiEndpoint, deviceid);
  
  let headerConfig = {
    headers: {
        accept: 'text/plain',
        Authorization: 'Bearer '+jwtToken
    }
  };

  try{
    console.log(`*** GET REQUEST *** \nEndpoint: ${deviceEndpoint}`);
    axios.get(deviceEndpoint, headerConfig)
    .then(response =>{
      console.log(response.data);
      return response.data;
    })
    .catch(function(error){
      if(error.response){
        console.log(`\nAxios error with device ${deviceid}:\n${error.stack}`);
      }
    });    
  } catch (error) {
      console.log("Error encountered:\n", error.stack);
  };
}

module.exports = {SendGetCommand};
