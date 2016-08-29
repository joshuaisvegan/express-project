var express = require('express');
var app = express();
var twitterAPI = require('./twitterAPI');

app.use(express.static(__dirname + '/static'));

app.get('/tweets', function(req, res){
    //console.log(twitterAPI.search());
    console.log();
    new Promise(function(resolve, reject){
        resolve(twitterAPI.search());
    }).then(function(val){

        res.write(JSON.stringify(val));
        res.end();
    })
    //res.write("val");
    //res.end();
    /*twitterAPI.search(function (err, str){
        var tweets = JSON.parse(str);
        var tweetsObject = {};
            /*try{
                var tweets = JSON.parse(str);
            }
            catch(err) {
                console.log(err);
                cb(err);
                return;
            }*/

            /*for(var i = 0; i < 12; i++){
                var story = tweets[i].text.split('https');
                tweetsObject['https' + story[1]] = story[0];

            }
            res.write(JSON.stringify(tweetsObject));
            res.end();
    });*/
});


app.listen(9000);
