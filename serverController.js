var async = require("async");
var _ = require("lodash");
var legislatorManager = require('./legislatorManager');
var committeeManager = require('./committeeManager');
var legislators = [];

exports.test = function(){
    async.parallel([
        function(callback) {
            setTimeout(function() {
                console.log("Task 1");
                callback(null, {result:"dog"});
            }, 300);
        },
        function(callback) {
            setTimeout(function() {
                console.log("Task 2");
                callback(null, {result:"cat"});
            }, 200);
        },
        function(callback) {
            setTimeout(function() {
                console.log("Task 3");
                callback(null, {result:"panther"});
            }, 100);
        }
    ], function(error, results) {
        console.log(results);
        console.log("I choose you: " + results[1].two );
    });
};

exports.refreshLegislatorData = function (){
    async.parallel([
        function(callback){legislatorManager.getLegislators(callback);},
        function(callback){committeeManager.getCommittees(callback)}
        ],
        function(error, results){

        });
};