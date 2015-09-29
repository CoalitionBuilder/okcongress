var async = require("async");
var _ = require("lodash");
var legislatorManager = require('./legislatorManager');
var committeeManager = require('./committeeManager');
var committeeMembers = require('./committeeMembers');
var formCommittees = require('./formCommittees');
// access to the enriched legislator data
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
        console.log("I choose you: " + results[1].result );
    });
};

exports.refreshLegislatorData = function (){
    var res = [];
    async.parallel([
        function(callback){legislatorManager.getLegislators(callback);},// result array position 0
        function(callback){committeeManager.getCommittees(callback)},    // result array position 1
        function(callback){committeeMembers.getCommitteeMembers(callback)}    // result array position 1
        ],
        function(error, results){
            formCommittees.enrich(results);
        });
};

