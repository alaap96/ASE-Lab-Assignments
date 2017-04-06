/**
 * Created by user on 23/10/2016.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();
//var url = 'mongodb://shankarase2017:$hankar07@ds149820.mlab.com:49820/mongodbasespring2017';
var url='mongodb://root:secure@ds025239.mlab.com:25239/assignment10';
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** Insert Data **/
app.post('/register', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        insertDocument(db, req.body, function() {
            res.write("Successfully inserted");
            res.end();
        });
    });
})
var result ={
    "results":[]
};

/** Display all users **/
app.get('/display1', function (req, res) {

    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        findUser(db,function() {
            console.log("find users");
            console.log(result.results[0].fname);
            console.log(result.results);
            res.json(result.results);
        });
    });


})
/* Delete Implementation */
app.delete('/delete1',function(req,res)
{
    var p1=req.query.fn;
    var p2=req.query.ln;

    console.log(req.query);
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
    deleteuser(db,p1,p2,function () {

    });
});
})
/* Update Implementation */
app.put('/update1',function(req,res)
{
    var p1=req.body.params.fn1;
    var p2=req.body.params.ln1;
     console.log("update in the server side");
    console.log(p1);
    console.log(p2);
    console.log(req.body.params);
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        updateuser(db,p1,p2,function () {

        });
    });
})
/* update user method implementation */
var updateuser = function(db,data1,data2,callback){
    console.log("Update user function invoked in server side");
    console.log(data1);
    console.log(data2);
    db.collection('users').update({"fname":data1},{"lname":data2,"fname":data1},false,function (err,result) {
        if(err)
        {
            callback();

        }else{
            //console.log(data.fname);
            console.log("succesfully updated  from server");
        }
    } );


};

/** deleteuser method implementation **/
var deleteuser = function(db,data1,data2,callback){
    console.log("delete user function");
    console.log(data1);
    console.log(data2);
    db.collection('users').remove({"fname":data1,"lname":data2},true,function (err,result) {
        if(err)
        {
            callback();

        }else{
            //console.log(data.fname);
            console.log("succesful delete from server");
        }
    } );
    

    };

var findUser = function(db,callback) {
    var cursor =db.collection('users').find( );
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {

           result.results.push({"fname":doc.fname,"lname":doc.lname});
        } else {
            callback();
        }
    });
};
var insertDocument = function(db, data, callback) {
    db.collection('users').insertOne( data, function(err, result) {
        if(err)
        {
            res.write("Registration Failed, Error While Registering");
            res.end();
        }
        console.log("Inserted a document into the restaurants collection.");
        callback();
    });
};
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})