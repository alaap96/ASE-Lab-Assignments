/**
 * Created by user on 23/10/2016.
 */
var myapp = angular.module('demoMongo',[]);
myapp.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
});
myapp.controller('MongoRestController',function($scope,$http){
    $scope.insertData = function(){
      /*  console.log($scope.formData);
       console.log($scope.formData.fname);
        console.log($scope.formData.email);
        console.log($scope.formData.password);
        console.log($scope.formData.cpassword); */
        var dataParams = {
            'fname' : $scope.fname,
            'lname' : $scope.lname,
            'email' : $scope.email,
            'pw' : $scope.pw
        };
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        console.log($scope.formData);
        var req = $http.post('http://127.0.0.1:8081/register',$scope.formData);
        req.success(function(data, status, headers, config) {
            $scope.message = data;
            console.log(data);

        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    };


}),


    myapp.controller('crudcontrol', function($scope,$http) {

        $scope.init = function() {
            $scope.records = [];


            var xyz = $http.get('http://127.0.0.1:8081/display1').then(function (d) {
                console.log("Angular JS");
                console.log(d.data[0]);
                console.log(d.data.length);
                //console.log(d[0].fname);

                for (var i = 0; i <= d.data.length; i++) {
                    $scope.records[i] = d.data[i];
                }


            }, function (err) {
                console.log(err);
            });


        };
        $scope.deleteuser=function () {
        /*    var delnames ={
                'fn': $scope.fnam1,
                'ln': $scope.lnam1
            };
            console.log(delnames); */

            var m1 = $http.delete('http://127.0.0.1:8081/delete1',{params:{fn:$scope.fnam1,ln:$scope.lnam1}}).then(function (d) {
                console.log("In delete User");
                console.log(d);
                console.log("Succesfully deleted");
                init();

            },function (err)
            {
                console.log("Error in delete User");
              console.log(err);
            })

        }

        $scope.updateuser=function () {

             console.log("client side in update user");
             console.log($scope.lnam1);
            var m1 = $http.put('http://127.0.0.1:8081/update1',{params:{fn1:$scope.fnam1,ln1:$scope.lnam1}}).then(function (d) {
                console.log("Succesfully updated user");
                console.log(d);
                init();

            },function (err)
            {
                console.log("Error in update user");
                console.log(err);
            })

        }


    });


