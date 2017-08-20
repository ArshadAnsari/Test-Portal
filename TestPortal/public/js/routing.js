myApp.config(function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "login.html",
        controller: "LoginRegisterController"
    }).when("/home", {
        templateUrl: "home.html",
        controller: "homeController"
    }).when("/prepareNewPaper", {
        templateUrl: "prepareQuestion.html",
        controller: "newPaperController"
    }).when("/review", {
        templateUrl: "review.html",
        controller: "reviewController"
    }).when("/candidatehome", {
        templateUrl: "candidateHome.html",
        controller: "candidateHomeController"
    }).when("/test", {
        templateUrl: "test.html",
        controller: "testController"
    }).when("/testSubmit", {
        templateUrl: "testSubmit.html"
    }).when("/reviewPaper", {
        templateUrl: "reviewPaper.html",
        controller: "reviewPaperController"
    });;
});