const axios = require('axios');
const urlConcat = require('../../lib/UrlConcat')
const core = require('@actions/core'); 

async function SendGetCommand(device, jwtToken, apiEndpoint){
  let deviceEndpoint = urlConcat.ConcatenatePlaceholder(apiEndpoint, device);
  deviceEndpoint += '?useDemo=true';    //for use in test suite, remove before final

  let headerConfig = {
    headers: {
        accept: 'text/plain',
        Authorization: 'Bearer '+jwtToken
    }
  };

  return await new Promise ((resolve, reject)=>{    //resolve then reject
    try{
      //core.info(`Endpoint: ${deviceEndpoint}`);
      axios.get(deviceEndpoint, headerConfig)
        .then(response =>{
          core.info(`Data Returned:\n Hostname:${response.data.hostName}\n Product:${response.data.product}\n Registered:${response.data.registrationState}\n Serial:${response.data.serialNumber}\n Firmware:${response.data.firmware}\n WebServer Enabled:${response.data.enableWebServer}\n WebServer Port:${response.data.webServerPort}`);
          resolve(true);
        }).catch(function(error){
          switch(error.response.status) {
            case 401:
              core.warning(`\tError Code ${error.response.status} with device '${device}': Authorisation Token invalid or missing, removing`);
              resolve(false);
              break;           
            case 404:
              core.warning(`\tError Code ${error.response.status} with device '${device}': Device or Endpoint not valid/found, removing`);
              resolve(false);
              break;
            default:
              core.warning(`\tError Code ${error.response.status} with device '${device}', removing.`);
              resolve(false);
              break;
          }
        });        
    } catch (error) {
        core.warning(`\tError occured: ${error.message}, removing`);
        reject(false);
    };
  });
}

module.exports = {SendGetCommand};
