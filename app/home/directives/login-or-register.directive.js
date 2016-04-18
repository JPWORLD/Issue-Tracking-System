(function () {
    'use strict';

    angular.module('issueTrackingSystem.home')
        .directive('loginOrRegister', loginOrRegister);

    function loginOrRegister() {
        var loginOrRegister = {
            restrict: 'A',
            templateUrl: 'app/home/templates/login-or-register.html'
        };

        return loginOrRegister;
    }

} ());
