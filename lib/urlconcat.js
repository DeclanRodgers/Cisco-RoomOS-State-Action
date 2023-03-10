function ConcatenatePlaceholder(apiEndpoint, deviceId){
    const replacements = {
      id: deviceId        
    };
      
    const completedURL = apiEndpoint.replace(/{\w+}/g, placeholder =>
      replacements[placeholder.substring(1, placeholder.length - 1)] || placeholder
    );
  
    return completedURL;
  };

module.exports = {ConcatenatePlaceholder};