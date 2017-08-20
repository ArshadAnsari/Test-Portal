function indexControllerFun($scope, $http, $location, validateSession) {
    $scope.onLogout = function() {
        $http({
            method: 'GET',
            url: '/logout',
            data: {},
            processData: false,
            responseType: "string",
            headers: { 'Content-Type': 'application/json' }
        }).then(function(data) {
            if (data.data == "loggedout")
                $location.path("/");
        })
    }

    $scope.onHomeClick = function() {
        if (validateSession.getSessionData().Type == "Candidate")
            $location.path("/candidatehome");
        else
            $location.path("/home");
    }
}

function LoginRegisterControllerFun($scope, $http, $location, validateSession) {
    validateSession.check($http, function() {
        if (validateSession.getSessionData().Type == "Candidate")
            $location.path("/candidatehome");
        else
            $location.path("/home");
    }, function() {});

    angular.element("#Registration").hide();
    angular.element("#Login").show();
    $scope.heading = 'Welcome to Test Portal, please login to continue';
    $scope.registerGender = "Mr.";
    $scope.onLoginUser = function() {
        if ($scope.loginEmail != undefined && $scope.loginPassword != undefined) {
            var formData = { email: $scope.loginEmail, password: $scope.loginPassword };
            $http({
                method: 'POST',
                url: '/submitLogin',
                data: formData,
                processData: false,
                responseType: "string",
                headers: { 'Content-Type': 'application/json' }
            }).then(function(data) {
                if (data.data == "success") {
                    validateSession.check($http, function() {
                        if (validateSession.getSessionData().Type == "Candidate")
                            $location.path("/candidatehome");
                        else
                            $location.path("/home");
                    }, function() {});
                } else {
                    $scope.heading = "No user found, please register as new user.";
                    angular.element("#Registration").show();
                    angular.element("#Login").hide();
                    $scope.loginEmail = undefined;
                    $scope.loginPassword = undefined;
                }
            });
        }
    }

    $scope.onSaveUser = function() {
        var formData = { gender: $scope.registerGender, name: $scope.registerName, mobile: $scope.registerMobile, email: $scope.registerEmail, password: $scope.registerPassword };
        $http({
            method: 'POST',
            url: '/submitRegister',
            data: formData,
            processData: false,
            responseType: "string",
            headers: { 'Content-Type': 'application/json' }
        }).then(function(data) {
            if (data.data == "success") {
                $scope.heading = "User added successfully, please login to continue.";
                angular.element("#Registration").hide();
                angular.element("#Login").show();
                $scope.loginEmail = undefined;
                $scope.loginPassword = undefined;
            } else {
                $scope.heading = "An error occured while registering the user, try again.";
                angular.element("#Registration").show();
                angular.element("#Login").hide();
                $scope.registerGender = "Mr.";
                $scope.registerName = undefined;
                $scope.registerMobile = undefined;
                $scope.registerEmail = undefined;
                $scope.registerPassword = undefined;
            }
        });
    }

    $scope.onCancelUser = function() {
        angular.element("#Registration").hide();
        angular.element("#Login").show();
    }

    $scope.onSignUp = function() {
        angular.element("#Registration").show();
        angular.element("#Login").hide();
    }
}

function homeControllerFun($scope, $http, $location, validateSession) {
    validateSession.check($http, function() {}, function() {
        $location.path("/");
    });

    $scope.onNewPaper = function() {
        validateSession.check($http, function() {
            $location.path("/prepareNewPaper");
        }, function() {
            $location.path("/");
        });
    }

    $scope.onReviewPaper = function() {
        validateSession.check($http, function() {
            $location.path("/review");
        }, function() {
            $location.path("/");
        });
    }
}

function newPaperControllerFun($scope, $http, $location, validateSession) {
    validateSession.check($http, function() {}, function() {
        $location.path("/");
    });

    var id = undefined;
    var questionCounter = 1;
    $scope.questions = { "questions": [], title: "", time: 1 };
    $scope.questions.questions.push({ "questionNumber": questionCounter, "text": "", "Options": [{ "number": 1, "text": "" }, { "number": 2, "text": "" }, { "number": 3, "text": "" }, { "number": 4, "text": "" }], "marks": 1 });
    questionCounter++;
    $scope.questions.questions.push({ "questionNumber": questionCounter, "text": "", "Options": [{ "number": 1, "text": "" }, { "number": 2, "text": "" }, { "number": 3, "text": "" }, { "number": 4, "text": "" }], "marks": 1 });

    $scope.addQuestion = function() {
        questionCounter++;
        $scope.questions.questions.push({ "questionNumber": questionCounter, "text": "", "Options": [{ "number": 1, "text": "" }, { "number": 2, "text": "" }, { "number": 3, "text": "" }, { "number": 4, "text": "" }], "marks": 1 });
    }

    $scope.removeQuestion = function(_num) {
        questionCounter = 1;
        var temp = [];
        for (var i = 0; i < $scope.questions.questions.length; i++) {
            if ($scope.questions.questions[i].questionNumber != Number(_num)) {
                $scope.questions.questions[i].questionNumber = questionCounter;
                temp.push($scope.questions.questions[i]);
                questionCounter++;
            }
        }
        questionCounter--;
        $scope.questions.questions = temp;
    }

    $scope.submitPaper = function() {
        $http({
            method: 'POST',
            url: '/submitPaper',
            data: { id: id, paper: $scope.questions },
            processData: false,
            responseType: "json",
            headers: { 'Content-Type': 'application/json' }
        }).then(function(data) {
            id = undefined;
            if (validateSession.getSessionData().Type == "Candidate")
                $location.path("/candidatehome");
            else
                $location.path("/home");
        });
    }

    $scope.$on("editPaper", function(evt, data) {
        questionCounter = data.paper.questions[data.paper.questions.length - 1].questionNumber;
        $scope.questions = data.paper;
        id = data.id;
    })
}

function reviewControllerFun($scope, $http, $rootScope, $location, validateSession, $timeout, reviewPaperID) {
    validateSession.check($http, function() {}, function() {
        $location.path("/");
    });

    $scope.tableData = [];
    $scope.currentDelete = undefined;
    $http({
        method: 'GET',
        url: '/reviewData',
        data: {},
        processData: true,
        responseType: "json",
        headers: { 'Content-Type': 'application/json' }
    }).then(function(data) {
        $scope.tableData = data.data;
    });

    $scope.onNoClick = function() {
        $scope.currentDelete = undefined;
        angular.element("#deleteModel").modal("hide");
    }

    $scope.onYesClick = function() {
        $http({
            method: 'POST',
            url: '/deletePaper',
            data: { id: $scope.currentDelete },
            processData: true,
            responseType: "json",
            headers: { 'Content-Type': 'application/json' }
        }).then(function(data) {
            if (data.data.status != "fail") {
                angular.element("#deleteModel").modal("hide");
                $scope.tableData = data.data;
                $scope.currentDelete = undefined;
            }
        });
    }

    $scope.onDeleteClick = function(_id) {
        $scope.currentDelete = _id;
    }

    $scope.onViewClick = function(_id) {
        for (var i in $scope.tableData) {
            if ($scope.tableData[i].id == _id) {
                $scope.viewData = JSON.parse($scope.tableData[i].paper);
                break;
            }
        }
    }

    $scope.onEditClick = function(_id) {
        for (var i in $scope.tableData) {
            if ($scope.tableData[i].id == _id) {
                $location.path("/prepareNewPaper");
                $timeout(function() {
                    $rootScope.$broadcast("editPaper", {
                        paper: JSON.parse($scope.tableData[i].paper),
                        id: _id
                    });
                }, 100);
                break;
            }
        }
    }

    $scope.onReviewClick = function(_id) {
        reviewPaperID.id = _id;
        $location.path("/reviewPaper");
    }
}

function candidateHomeControllerFun($scope, $http, $location, validateSession, testData) {
    validateSession.check($http, function() {}, function() {
        $location.path("/");
    });

    $scope.testID = "";
    $scope.message = "";
    $scope.onStartTest = function() {
        validateSession.check($http, function() {
            console.log($scope.testID)
            if ($scope.testID != "") {
                $http({
                    method: 'POST',
                    url: '/teststart',
                    data: { testID: $scope.testID },
                    processData: true,
                    responseType: "json",
                    headers: { 'Content-Type': 'application/json' }
                }).then(function(data) {
                    testData.data = data.data;
                    testData.data.testID = $scope.testID;
                    if (testData.data.status == 2) // TEST START
                    {
                        $location.path("/test");
                    } else if (testData.data.status == 1) // ALREADY APPEARED
                    {
                        $scope.message = "You have already appeared for the test.";
                    } else if (testData.data.status == 0) // NO PAPER FOUND
                    {
                        $scope.message = "No such paper found.";
                    }
                });
            }
        }, function() {
            $scope.testID = "";
            $location.path("/");
        });
    }
}

function testControllerFun($scope, $http, $location, validateSession, testData, timer) {
    validateSession.check($http, function() {
        $scope.viewData = JSON.parse(testData.data.paper);
        $scope.time = {};
        timer.stop();
        timer.start($scope.viewData.time, function(mins, secs) {
            $scope.time.mins = mins;
            $scope.time.secs = secs;
            console.log(mins, secs);
        }, function() {
            submit();
        })
    }, function() {
        $location.path("/");
    });

    $scope.onSubmitPaper = function() {
        submit();
    }

    function submit() {
        timer.stop();
        var scoredMarks = 0;
        var totalMarks = 0;
        for (var i in $scope.viewData.questions) {
            totalMarks += $scope.viewData.questions[i].marks;
            if (Number($scope.viewData.questions[i].correctAnswer) == $scope.viewData.questions[i].answer)
                scoredMarks += $scope.viewData.questions[i].marks;
        }
        $scope.viewData.scoredMarks = scoredMarks;
        $scope.viewData.totalMarks = totalMarks;

        $http({
            method: 'POST',
            url: '/testsubmit',
            data: { testID: testData.data.testID, data: $scope.viewData },
            processData: false,
            responseType: "json",
            headers: { 'Content-Type': 'application/json' }
        }).then(function(data) {
            console.log(data);
            $location.path("/testSubmit");
        });
    }
}

function reviewPaperControllerFun($scope, $http, $location, validateSession, reviewPaperID) {
    $scope.reviewTableData = [];
    validateSession.check($http, function() {
        if (reviewPaperID.id != undefined) {
            $http({
                method: 'POST',
                url: '/getReviewPaper',
                data: { testID: reviewPaperID.id },
                processData: true,
                responseType: "json",
                headers: { 'Content-Type': 'application/json' }
            }).then(function(data) {
                $scope.reviewTableData = data.data;
                for (var i in $scope.reviewTableData) {
                    $scope.reviewTableData[i].paper = JSON.parse($scope.reviewTableData[i].paper);
                }
                console.log($scope.reviewTableData);
            });
        } else
            $location.path("/review");


        $scope.onViewClick = function(_testID, _candidate) {
            for (var i in $scope.reviewTableData) {
                if ($scope.reviewTableData[i].testID == _testID && $scope.reviewTableData[i].candidate == _candidate) {
                    $scope.viewData = $scope.reviewTableData[i].paper;
                }
            }
        }
    }, function() {
        $location.path("/");
    });
}