exports.review = function(app, con, path, eventEmitter) {
    // app.get('/review', function(req, res) {
    //     eventEmitter.emit("checkSession", {
    //         req: req,
    //         res: res,
    //         successCallback: function() {
    //             res.sendFile(path.join(__dirname, '../public/views/reviewPaper.html'));
    //         },
    //         failcallback: function() {
    //             res.sendFile(path.join(__dirname, '../public/views/index.html'));
    //         }
    //     });
    // });
    app.get('/reviewData', function(req, res) {
        eventEmitter.emit("checkSession", {
            req: req,
            res: res,
            successCallback: function() {
                var sql = "SELECT * FROM questionpaper WHERE owner = " + "'" + req.session.Email + "'";
                con.query(sql, function(err, result) {
                    if (err) {} else {
                        res.end(JSON.stringify(result));
                    }
                });
            },
            failcallback: function() {
                res.end("{}");
            }
        });
    });
}

exports.deletePaper = function(app, con, path, eventEmitter) {
    app.post('/deletePaper', function(req, res) {
        eventEmitter.emit("checkSession", {
            req: req,
            res: res,
            successCallback: function() {
                // console.log(req.body.id)
                var sql = "DELETE FROM questionpaper WHERE id = '" + req.body.id + "'";
                con.query(sql, function(err, result) {
                    if (err) {
                        // console.log(err)
                        res.end("{status : 'fail'}");
                    } else {
                        var sql = "SELECT * FROM questionpaper WHERE owner = " + "'" + req.session.Email + "'";
                        con.query(sql, function(err, result) {
                            if (err) {} else {
                                res.end(JSON.stringify(result));
                            }
                        });
                    }
                });
            },
            failcallback: function() {
                // res.sendFile(path.join(__dirname, '../public/views/index.html'));
            }
        });
    });
}

exports.getPaper = function(app, con, path, eventEmitter) {
    app.post('/getReviewPaper', function(req, res) {
        console.log(req.body)
        eventEmitter.emit("checkSession", {
            req: req,
            res: res,
            successCallback: function() {
                var sql = "SELECT * FROM test WHERE testID = " + "'" + req.body.testID + "'";
                con.query(sql, function(err, result) {
                    if (err) {} else {
                        res.end(JSON.stringify(result));
                    }
                });
            },
            failcallback: function() {
                res.sendFile(path.join(__dirname, '/views'));
            }
        });
    });
}