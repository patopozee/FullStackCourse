const express = require ('express');
const bodyParse = require ('body-parser');
const request = require ('request');
const app = express();

const apiKey = "33f173eb70d36f3ded5c76a7ddb2d6c0";

app.use(express.static ('public'));
app.use(bodyParse.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('index', {weather: null, error: null})
});
app.post('/', function(req, res){
    let city = req.body.city;
    let url='https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={apiKey}';
    console.log(req.body.city);
    request(url, function (err, response, body){
        if(err){
            res.render('index', {weather: null, error: 'Error, please try again'});
        }else {
            let weather = JSON.parse(body);
            if(weather.main ==undefined){
                res.render('index',{
                    weather:null,
                    error:'Error,please try again',
                });
            }else{
                let weatherText = 'It ${weather.main.temp} degress Celsius with ${weather.weather[0].main} in ${weather.name}!';
                res.render('index', {weather: weatherText, error:null});
                console.log('body:',body);
            }
        }
    });
});

app.listen(3000, function(){
    console.log('weatherly app listening on port 3000!');
});