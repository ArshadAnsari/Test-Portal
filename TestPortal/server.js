var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var path = require('path');
var session = require("express-session");
var mysql = require('mysql');
var events = require("events");
var eventEmitter = new events.EventEmitter();
var login_register = require('./modules/login_register.js');
var newPaperModule = require('./modules/newPaper.js');
var reviewPaperModule = require('./modules/reviewPaper.js');
var testModule = require('./modules/test.js');


//==================== Set middlewares ====================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET , POST, PUT, DELETE");
    next();
});
app.use(session({
    secret: 'hgbfdjjbvjbdoihsdvjbsdib',
    cookie: { maxAge: 30 * 60 * 1000 }
    // cookie : {maxAge : 6000}
}));

var con = mysql.createConnection({
    host: "127.0.0.1",
    //port:3306,
    user: "ArshadAnsari",
    password: "Arshad",
    database: "testportaldb"
});
con.connect(function(err) {
    if (err)
        throw err;
    else {
        // console.log("Connected!"); 
    }
});

login_register.login(app, con, path, eventEmitter);
login_register.register(app, con, path, eventEmitter);

newPaperModule.newPaper(app, con, path, eventEmitter);
newPaperModule.submitPaper(app, con, path, eventEmitter);

reviewPaperModule.review(app, con, path, eventEmitter);
reviewPaperModule.deletePaper(app, con, path, eventEmitter);
reviewPaperModule.getPaper(app, con, path, eventEmitter);

testModule.start(app, con, path, eventEmitter)
testModule.submit(app, con, path, eventEmitter)

app.get('/', function(req, res) {
    res.redirect('/views');
});

app.get("/logout", function(req, res) {
    req.session.destroy(function() {
        res.end("loggedout");
    });
});

app.get('/getSessionData', function(req, res) {
    eventEmitter.emit("checkSession", {
        req: req,
        res: res,
        successCallback: function() {
            res.end(JSON.stringify(req.session));
        },
        failcallback: function() {
            res.end("{expired : true}");
        }
    });
});

var server = app.listen(511, function() {});

eventEmitter.on('checkSession', function(_obj) {
    if (_obj.req.session && _obj.req.session.views) {
        _obj.req.session.views++
            _obj.successCallback()
    } else {
        _obj.failcallback()
    }
});