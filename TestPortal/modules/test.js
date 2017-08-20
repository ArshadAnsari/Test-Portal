exports.start = function(app, con, path, eventEmitter) {
    app.post('/teststart', function(req, res) {
        var obj = {};
        var sql = "SELECT * FROM questionpaper WHERE id = '" + req.body.testID + "'";
        con.query(sql, function(err, result) {
            if (err) {
                obj.status = 9; // ERROR
                res.end(JSON.stringify(obj))
            } else {
                if (result.length > 0) {
                    sql = "SELECT * FROM test WHERE candidate = '" + req.session.Email + "' AND testID = '" + req.body.testID + "'";
                    con.query(sql, function(err1, result1) {
                        if (err1) {
                            obj.status = 9; // ERROR
                            res.end(JSON.stringify(obj))
                        } else {
                            if (result1.length == 0) {
                                sql = "INSERT INTO test (paper, candidate, result, testID, marks) VALUES ('" + result[0].paper + "', '" + req.session.Email + "', 'fail', '" + req.body.testID + "', 0)";
                                con.query(sql, function(err2, result2) {
                                    if (err2) {
                                        obj.status = 9; // ERROR
                                        res.end(JSON.stringify(obj))
                                    } else {
                                        obj.status = 2;
                                        obj.paper = result[0].paper;
                                        res.end(JSON.stringify(obj))
                                    }
                                });
                            } else {
                                obj.status = 1; // ALREADY APPEARED FOR THE PAPER
                                res.end(JSON.stringify(obj))
                            }
                        }
                    });
                } else {
                    obj.status = 0; // NO PAPER FOUND
                    res.end(JSON.stringify(obj))
                }
            }
        });
    });
}

exports.submit = function(app, con, path, eventEmitter) {
    app.post('/testsubmit', function(req, res) {
        console.log(req.body)
        var obj = {};
        var result = "fail";
        if (req.body.data.scoredMarks / req.body.data.totalMarks >= 0.4)
            result = "pass";
        var sql = "UPDATE test SET paper = '" + JSON.stringify(req.body.data) + "', marks = '" + req.body.data.scoredMarks + "', result = '" + result + "' WHERE testID = '" + req.body.testID + "' AND candidate = '" + req.session.Email + "'";
        con.query(sql, function(err, result) {
            if (err) {
                obj.status = 9; // ERROR
                res.end(JSON.stringify(obj))
            } else {
                obj.status = 0; // Submitted
                res.end(JSON.stringify(obj))
            }
        });
    });
}