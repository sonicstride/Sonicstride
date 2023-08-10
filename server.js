//add express 
var express = require('express');
var app = express();
var engine = require('ejs-locals');
var bodyParser = require('body-parser');
var admin = require("firebase-admin");
var serviceAccount = require("./sonicstride-database-firebase-adminsdk-ndnzx-693f7ed393.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:"https://sonicstride-database-default-rtdb.firebaseio.com/",
});

app.engine('ejs', engine);
app.set('views', "./views");
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: false }));


var fireData = admin.database();
fireData.ref('userdata').once('value', function(snapshot){
    console.log(snapshot.val());
});


//使用者
app.get('/', function (req, res) {
    res.render('user');
});


//資料查看
app.get('/dataview', function (req, res) {
    fireData.ref('userdata').once('value', function(snapshot){
        value = snapshot.val();
        res.render('dataview',{"datalist":value});
    });
    
});


//回傳dataview
app.post('/readData', function (req, res) {

    fireData.ref('userdata').once('value', function(snapshot){
        value = snapshot.val();
        //console.log(value);
        res.send(value);
    });
});


app.post('/writeData', function (req, res) {
    console.log(req.body);
    var fireurl = fireData.ref('userdata').push();
    fireurl.set(req.body);
    res.send("get msg : " + req.body);
});



//set port
var port = process.env.PORT || 3000;
app.listen(port);