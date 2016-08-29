var twitterAPI = require('./twitterAPI');
var https = require('https');
var credentials = require('./credentials');
var concatenated = credentials.consumerKey + ':' + credentials.consumerSecret;
var base64Encoded = Buffer(concatenated).toString('base64');
function makeRequest(options, text) {
    return new Promise(function(resolve, reject){
        var req = https.request(options, function(response, err) {
            if (err) {
                reject(err);
            } else {
                var str = '';
                response.on('data', function(chunk) {
                    str += chunk;
                });
                response.on('end', function() {
                    resolve(str);
                });
            }
        });
        if(text){
            console.log('text ' + text);
            req.write(text);
        }else{
            req.write(text);
        }
        req.end();
    });
}


exports.makeRequest = makeRequest;
