exports.newPaper = function(app, con, path, eventEmitter) {
    app.get('/prepareNewPaper', function(req, res) {
        eventEmitter.emit("checkSession", {
            req: req,
            res: res,
            successCallback: function() {
                //res.sendFile(path.join(__dirname, '../public/views/prepareQuestion.html'));
            },
            failcallback: function() {
                //res.sendFile(path.join(__dirname, '../public/views/index.html'));
            }
        });
    });
}


exports.submitPaper = function(app, con, path, eventEmitter) {
    app.post('/submitPaper', function(req, res) {
        eventEmitter.emit("checkSession", {
            req: req,
            res: res,
            successCallback: function() {
                if (req.body.id == undefined) {
                    var sql = "INSERT INTO questionpaper (id, title, paper, owner) VALUES ('" + shuffle(req.body.paper.title.replace(/\s/g, "").split("")).join("") + "', '" + req.body.paper.title + "', '" + JSON.stringify(req.body.paper) + "', '" + req.session.Email + "')";
                } else {
                    var sql = "UPDATE questionpaper SET paper = '" + JSON.stringify(req.body.paper) + "' WHERE id = '" + req.body.id + "' AND owner = '" + req.session.Email + "'";
                }
                con.query(sql, function(err, result) {
                    if (err) {
                        // res.end("fail");					
                    } else {
                        // console.log(result);
                    }
                });
            },
            failcallback: function() {
                //res.sendFile(path.join(__dirname, '../public/views/index.html'));
            }
        });
        res.end();
    });
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}