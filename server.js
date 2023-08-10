//add express 
var express = require('express');
var app = express();
var engine = require('ejs-locals');
var bodyParser = require('body-parser');
var data = {'value':'nun'};

app.engine('ejs', engine);
app.set('views', "./views");
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extends:false}));


//後台查看資料
app.get('/user', function(req, res){
    res.render('user');
});

//使用者
app.get('/input', function(req, res){
    res.render('input');
});

app.post('/readData', function(req, res){
    res.send(data);
});

app.post('/inputAJAX', function(req, res){
    console.log(req.body);
    res.send("get msg : " + req.body.value1);
    data = req.body.value1;
});

//set port
var port = process.env.PORT || 3000;
app.listen(port);
