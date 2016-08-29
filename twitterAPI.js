var promisifyTwitter = require('./promisifyTwitter');
var https = require('https');
var credentials = require('./credentials');
var concatenated = credentials.consumerKey + ':' + credentials.consumerSecret;
var base64Encoded = Buffer(concatenated).toString('base64');
var tokenAccess = "";
function search(data){
    var options1 = {
        host: 'api.twitter.com',
        path: '/oauth2/token',
        port: '443',
        method: 'POST',
        headers: {
            Authorization: 'Basic ' + base64Encoded,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    };
    return promisifyTwitter.makeRequest(options1, 'grant_type=client_credentials').then(function(val){

        var options2 = {
            host: 'api.twitter.com',
            path: '/1.1/statuses/user_timeline.json?screen_name=REALpunknews&count=12',
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + JSON.parse(val).access_token,
                'Content-Type': 'application/json'
            }
        };
        console.log(promisifyTwitter.makeRequest(options2, ""));
    return promisifyTwitter.makeRequest(options2, "");
}).then(function(val){
    var bucket = {}
    JSON.parse(val).forEach(function(tweets){
        var story = tweets.text.split('https');
        bucket['https' + story[1]] = story[0];
    })
    return bucket;
}).then(function(val){
    return val;
});
    /*getToken(function(err, data){
        if(err){
            console.log(err);
            cb(err);
            return;
        }



        var callback = function(response) {
            var str = '';
            if(response.statusCode !== 200){
                console.log(response.statusCode);
                cb(response.statusCode);
                return;
            }
            response.on('data', function(chunk) {
                str += chunk;

            });

            response.on('end', function() {
                cb(err, str);
            });
        }

        var req = https.request(options, callback);
        req.end();
        req.on('error', cb);
    });*/

}

function getToken(cb){


    var callback = function(response) {
        var str = '';
        response.on('data', function(chunk) {
            str += chunk;
        });

        response.on('end', function() {
            var token = JSON.parse(str);
            tokenAccess = token.access_token;
            cb(null, token.access_token);
        });
    }

    var req = https.request(options, callback);
    req.write('grant_type=client_credentials');
    req.end();

}

exports.search = search;
