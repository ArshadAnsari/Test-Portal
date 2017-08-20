myApp.service("validateSession", function() {
    var sessionData = undefined;
    this.check = function($http, successCallback, failCallback) {
        $http({
            method: 'GET',
            url: '/getSessionData',
            data: {},
            processData: false,
            responseType: "json",
            headers: { 'Content-Type': 'application/json' }
        }).then(function(data) {
            sessionData = data.data;
            if (data.data) {
                angular.element(".logoutButton").show();
                successCallback();
            } else {
                angular.element(".logoutButton").hide();
                failCallback();
            }
        });
    }

    this.getSessionData = function() {
        return sessionData ? sessionData : {};
    }
});

myApp.service("testData", function() {
    this.data = undefined;
});

myApp.service("reviewPaperID", function() {
    this.id = undefined;
});

myApp.service("timer", function($interval) {
    var intrvl;
    var thisObj = this;
    this.start = function(_mins, _progressCallback, _endCallback) {
        var mins = _mins;
        var secs = mins * 60;
        var seconds;
        intrvl = $interval(function() {
            mins = Math.floor(secs / 60);
            seconds = secs - Math.round(mins * 60);
            _progressCallback(mins, seconds);
            if (mins == 0 && seconds == 0) {
                _endCallback();
                thisObj.stop();
            }
            secs--;
        }, 1000);
    }

    this.stop = function() {
        $interval.cancel(intrvl);
    }
});