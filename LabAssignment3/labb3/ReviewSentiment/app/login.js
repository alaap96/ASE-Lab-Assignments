/**
 * Created by ALAAP on 2/8/2017.
 */
/**
 * Created by Nithin on 28-Jan-17.
 */
var app = angular.module('myLogin', []);
app.controller('LoginController',function($scope,$window) {

    $scope.login = function (uname, pwd) {
        localStorage.setItem("name" , uname);
        localStorage.setItem("password" , pwd);
        if ($scope.uname == "Nithin" && $scope.pwd == "12345") {
            $window.location.href = './home.html';
        }
        else
            alert('Login incorrect');
    };
    $scope.register = function(){
        $window.location.href = './registration.html'
    };
    $scope.onSignIn = function(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
    }
});
