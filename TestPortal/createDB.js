var mysql = require('mysql');

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
		// var sql = "CREATE DATABASE chattingapp";
		// var sql = "CREATE TABLE users (name VARCHAR(255), email VARCHAR(255), username VARCHAR(255), password VARCHAR(255), status BOOL NOT NULL DEFAULT '0')";
		// var sql = "INSERT INTO users (name, email, username, password) VALUES ('Arshad', 'Arshad@abc.com', 'ArshadAnsari','123456')";
		// var sql = "INSERT INTO users (name, email, username, password) VALUES ('Salim', 'Salim@abc.com', 'SalimKhan','123456')";
		// var sql = "SELECT * FROM user";
		// var sql = "DROP DATABASE chattingapp";
		var sql = "CREATE TABLE QuestionPaper (id VARCHAR(255), paper VARCHAR(255))";
		con.query(sql, function (err, result) {
			if (err)
				throw err;
			else
			{
				console.log(result);
				// for (var i in result)
					// console.log(result[i]);
			}
	  });
	}
});