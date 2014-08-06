(function() {
    var app = angular.module('modal', []);

    app.controller('mstController', function($scope, $http) {
        console.log('mstController!');
        this.hello = function() {
            console.log('hello!!!');
        };
    });
})();