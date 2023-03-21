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
        var responseData = response.data;
        console.log(`Data Returned:\n Hostname:${responseData['hostName']}\n Product${responseData['product']}`)
        //console.log(`GET Data Recieved for ${device}:\n${JSON.stringify(response.data, null, "\t")}`);
      }).catch(function(error){
        switch(error.response.status) {
          case 401:
            console.log(`Axios error with device ${device}:\nError Code ${error.response.status}: Authorisation Token invalid or missing\n`);
            break;
          default:
            console.log(`Axios error with device ${device}: Error Code ${error.response.status}\n`);
            break;
        
        // if(error.response){
        //   console.log(`Axios error with device ${device}:\n${error.message}\nError Code:${error.code}\nError Status:${error.response.status}\n`);
        // }
        }
      });        
  } catch (error) {
      console.log(`Error occured:\n ${error.message}`);
  };
}

module.exports = {SendGetCommand};
