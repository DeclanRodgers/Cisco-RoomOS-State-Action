const axios = require('axios');
const urlConcat = require('../../lib/UrlConcat')

async function SendGetCommand(device, jwtToken, apiEndpoint){
  let deviceEndpoint = urlConcat.ConcatenatePlaceholder(apiEndpoint, device);
  deviceEndpoint += '?useDemo=true';    //for use in test suite, remove before final
  
  let headerConfig = {
    headers: {
        accept: 'text/plain',
        Authorization: 'Bearer '+jwtToken
    }
  };

  try{
    console.log(`Endpoint: ${deviceEndpoint}`);
    await axios.get(deviceEndpoint, headerConfig)
      .then(response =>{
        console.log(`GET Data Recieved for ${device}:\n${JSON.stringify(response.data, null, "\t")}`);
      }).catch(function(error){
        if(error.response){
          console.log(`Axios error with device ${device}:\n${error.message}\nError Code:${error.code}\nError Status:${error.response.status}\n`);
        }
      });        
  } catch (error) {
      console.log(`Error occured:\n",${error.message}`);
  };
}

module.exports = {SendGetCommand};
