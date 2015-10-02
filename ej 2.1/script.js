/**
 * Created by diegoprieto on 2/10/15.
 */

var myApp = angular.module('myApp',['ngRoute']);

myApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'mainController'
        })

        .when('/members', {
            templateUrl : 'pages/members.html',
            controller  : 'membersController'
        })
});


myApp.controller('mainController', function($scope) {
    $scope.message = 'Everyone come and see how good I look!';
});

myApp.controller('membersController', [ '$scope','$http', function($scope,$http)
{
    $scope.change = function(organization) {
        console.log("https://api.github.com/orgs/"+organization+"/members");
        var responsePromise = $http.get("https://api.github.com/orgs/"+organization+"/members");
        responsePromise.success(function(data, status, headers, config)
        {
            $scope.org = data;
        });
        responsePromise.error(function(data,status,headers,config)
        {
            console.error('Error', status, data);
        });
    };
}]);

myApp.directive('githubTeam' ,[function()
{
    return {
        restrict : 'E',
        templateUrl : 'pages/template.html',
    }
}]);