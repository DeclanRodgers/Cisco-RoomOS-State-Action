const axios = require('axios');
const urlConcat = require('../../lib/UrlConcat')

async function SendPostCommand(device, xCommand, jwtToken, apiEndpoint){
  let deviceEndpoint = urlConcat.ConcatenatePlaceholder(apiEndpoint, device);
  deviceEndpoint += '/command?useDemo=true';    //for use in test suite, remove before final

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
    console.log(`Endpoint: ${deviceEndpoint}`)
    await axios.post(deviceEndpoint, bodyData, headerConfig)
      .then(response =>{
        console.log(`POST Data recieved for ${device}:\n${JSON.stringify(response.data, null, "\t")}`);
      }).catch(function(error){
        if(error.response){
          console.log(`Axios error with device ${device}:\n${error.message}\nError Code:${error.code}\nError Status:${error.response.status}\n`);
        }
    });
  } catch (error) {
    console.log(`Error occured:\n${error.message}`);
  };
}
  
module.exports = {SendPostCommand};