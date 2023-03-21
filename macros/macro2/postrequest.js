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
        console.log(`Response:${response.status} - xCommand(s) sent`);
      }).catch(function(error){
        switch(error.response.status) {
          case 401:
            console.log(`Axios error with device ${device}:\nError Code ${error.response.status}: Authorisation Token invalid or missing\n`);
            break;
          default:
            console.log(`Axios error with device ${device}: Error Code ${error.response.status}\n`);
            break;
        }
    });
  } catch (error) {
    console.log(`Error occured:\n${error.message}`);
  };
}
  
module.exports = {SendPostCommand};