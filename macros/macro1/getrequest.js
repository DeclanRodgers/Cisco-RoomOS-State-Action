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
        console.log(`Data Returned:\n Hostname:${response.data.hostName}\n Product:${response.data.product}\n Registered:${response.data.registrationState}\n Serial:${response.data.serialNumber}\n Firmware:${response.data.firmware}\n WebServer Enabled:${response.data.enableWebServer}\n WebServer Port:${response.data.webServerPort}\n`);
        //var responseData = response.data;
        //console.log(`Data Returned:\n Hostname:${responseData['hostName']}\n Product${responseData['product']}`)
      }).catch(function(error){
        switch(error.response.status) {
          case 401:
            console.log(`Error Code ${error.response.status} with device '${device}': Authorisation Token invalid or missing\n`);
            break;
          case 404:
            console.log(`Error Code ${error.response.status} with device '${device}': Device or Endpoint not valid/found\n`);
            break;
          default:
            console.log(`Error Code ${error.response.status} with device '${device}'\n`);
            break;
        }
      });        
  } catch (error) {
      console.log(`Error occured:\n ${error.message}`);
  };
}

module.exports = {SendGetCommand};
