var express = require('express');
var app = express();
var twitterAPI = require('./twitterAPI');

app.use(express.static(__dirname + '/static'));

app.use(require('cookie-parser')());

/*app.use(function(req, res, next){
    console.log(req.url, req.method);
    next();
    if(req.url !== '/name.html' && !req.cookies.name && req.url !== '/name'){
       res.redirect('/name.html');
    }
});


app.use(require('body-parser').urlencoded({
    extended: false
}));*/

app.get('/tweets', function(req, res){
    twitterAPI.search(function (err, str){
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

            for(var i = 0; i < 12; i++){
                var story = tweets[i].text.split('https');
                tweetsObject['https' + story[1]] = story[0];

            }
            res.write(JSON.stringify(tweetsObject));
            res.end();

        //console.log(err, 555);
    });
});

app.post('/name', function(req, res) {
    console.log(req);
    res.cookie('name', req.body);
    res.redirect('/name.html');
});



app.listen(9000);
