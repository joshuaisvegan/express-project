var express = require('express');
var app = express();
var twitterAPI = require('./twitterAPI');
var pg = require('pg');
var cookieParser = require('cookie-parser');
var handlebars = require('express-handlebars');
var filterQuery = "SELECT * FROM user_names JOIN user_profile ON user_names.id = user_profile.userid WHERE user_profile.city = $1 AND user_profile.color = $2";
var unfilteredQuery = "SELECT first_name, last_name, age, city, homepage, color FROM user_names JOIN user_profile ON userID = user_names.ID";

app.use(express.static(__dirname + '/static'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(cookieParser());
app.use(require("body-parser").urlencoded({
    extended: false
}));

app.get('/tweets', function(req, res){
    new Promise(function(resolve, reject){
        resolve(twitterAPI.search());
    }).then(function(val){

        res.write(JSON.stringify(val));
        res.end();
    });
});

app.post('/name', function(req, res){
    console.log(req.body);
    var client = new pg.Client("postgres://joshua:!nshallah@localhost:5432/users");

    client.connect(function (err) {
        if (err){
            throw err;
        }
        var form1 = "INSERT INTO user_names (first_name, last_name) VALUES ($1, $2) RETURNING id";
        client.query(form1, [req.body.first_name, req.body.last_name], function (err, result) {
            if (err){
                throw err;
            }
            res.cookie("userID", result.rows[0].id);
            res.redirect('more-info.html');
            client.end(function (err) {
                if (err){
                    throw err;
                }
            });
        });
    });
});
app.post('/moreinfo', function(req, res){
    console.log(req.body);

    var client = new pg.Client("postgres://joshua:!nshallah@localhost:5432/users");

    client.connect(function (err) {
        if (err){
            throw err;
        }
        var form2 = "INSERT INTO user_profile (age, city, homepage, color, userid) VALUES ($1, $2, $3, $4, $5)";
        console.log(req.cookies);
        client.query(form2, [req.body.age, req.body.city, req.body.homepage, req.body.color, req.cookies.userID], function (err, result) {
            if (err){
                throw err;
            }
            console.log(result.rows[0]);
            client.end(function (err) {
                if (err){
                    throw err;
                }
            });
        });
    });
});

app.get('/userlist', function(req, res){
    var client = new pg.Client("postgres://joshua:!nshallah@localhost:5432/users");
    client.connect(function (err) {

        if (err){
            throw err;
        }if (req.query.city){
            client.query(filterQuery, [req.query.city, req.query.color], renderResults);
        }
        else {
            client.query(unfilteredQuery, renderResults);
        }

        function renderResults(err, result){
            if (err){
                throw err;
            }
            var cities = result.rows.map(function(user){
                return user.city;
            });
            var uniqueCities = makeNovel(cities);
            var colors = result.rows.map(function(user){
                return user.color;
            });
            var uniqueColors = makeNovel(colors);
            res.render('user-list', {userinfo: result.rows, cities: uniqueCities, colors: uniqueColors});
            client.end(function (err){
                if (err){
                    throw err;
                }
            });
            function makeNovel(items){
                var checkArray = [];
                items.forEach(function(item){
                    if (checkArray.indexOf(item) == -1){
                        checkArray.push(item);
                    }
                });
                return checkArray;
            }
        }
    });
});
app.listen(9000);
