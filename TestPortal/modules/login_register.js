/* module.export = function(app){
	var express = require('express');
	// var app = express();
	var bodyParser = require("body-parser");
	var urlencodedParser = bodyParser.urlencoded({ extended: false });
	var router = express.Router();
	var mysql = require('mysql');

	app.use(bodyParser.json());                             // parse application/json
	app.use(bodyParser.json({ type: 'application/json' })); // parse application/vnd.api+json as json


	var con = mysql.createConnection({
		host: "127.0.0.1",
		//port:3306,
		user: "ArshadAnsari",
		password: "Arshad",
		database : "testportaldb"
	});
	con.connect(function(err) {
		if (err) 
			throw err;
		else
		{
			console.log("Connected!"); 
		}
	});


	router.use(function(req, res, next) {
		console.log(req)
		console.log(req.body)
		console.log(req.params)
		console.log(req.query)
		next();
	});
	router.post('/', urlencodedParser, function(req, res){
		console.log(req.body)
		console.log(req.params)
		console.log(req.query)
	   res.send('POST route on things.');
	});

	return  router;
} */

exports.login = function(app, con, path, eventEmitter) {
    app.post('/submitLogin', function(req, res) {
        eventEmitter.emit("checkSession", {
            req: req,
            res: res,
            successCallback: function() {
                res.end("success");
            },
            failcallback: function() {
                var sql = "SELECT * FROM user WHERE Email = " + "'" + req.body.email + "' AND Password = '" + req.body.password + "'";
                con.query(sql, function(err, result) {
                    if (err)
                        res.end("fail");
                    else {
                        if (result.length > 0) {
                            req.session.views = 1;
                            req.session.Name = result[0].Name;
                            req.session.Email = result[0].Email;
                            req.session.Type = result[0].Type;
                            res.end("success");
                        } else {
                            res.end("fail");
                        }
                    }
                });
            }
        });
    });
}

exports.register = function(app, con, path, eventEmitter) {
    app.post('/submitRegister', function(req, res) {
        var sql = "INSERT INTO user (Email, Name, Gender, Password, Mobile, Type) VALUES ('" + req.body.email + "', '" + req.body.name + "', '" + req.body.gender + "', '" + req.body.password + "', '" + req.body.mobile + "', 'Candidate')";
        con.query(sql, function(err, result) {
            if (err)
                res.end("fail");
            else {
                if (result.serverStatus == 2) {
                    res.end("success");
                } else {
                    res.end("fail");
                }
            }
        });
    });
}