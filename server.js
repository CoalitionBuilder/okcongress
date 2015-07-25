// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var fs = require('fs');
var request = require('request');
var db = require('./config/db');
var https = require('https');

var port = process.env.PORT || 8080; // set our port

app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

var router = express.Router();              // get an instance of the express Router

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

var proxyresponse;

var options = {
	    url: "https://congress.api.sunlightfoundation.com/bills/search",
	    method: 'GET'
};


router.get('/legislators', function(req,res){
	res.json(legislators);
	res.end();
});



/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
// Enriching legislator data
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////
// All Legislators
/////////////////////////////////////////////////////////////
var retobj = {};
var getLegislators = function(req, res, page){
	request('https://www.govtrack.us/api/v2/role?current=true&limit=6000', 
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log('Legislators')
				console.log(body)
			} else{ // on failure
			  res.json({message:response.statusCode});
			  res.end();//exit
			}		  
		})
};

getLegislators()




/////////////////////////////////////////////////////////////
// All Committees
/////////////////////////////////////////////////////////////
var retobj = {};
var getCommittees = function(req, res, page){
	request('https://www.govtrack.us/api/v2/committee?limit=6000', 
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log('Committees')
				console.log(body)
			} else{ // on failure
			  res.json({message:response.statusCode});
			  res.end();//exit
			}		  
		})
};

getCommittees()


/////////////////////////////////////////////////////////////
// Enriching legislator data
/////////////////////////////////////////////////////////////







// Old Ways
var legislators = JSON.parse(fs.readFileSync('legislators.json'));
var committeeMembership = JSON.parse(fs.readFileSync('committee-membership-current.json'));
var committees = JSON.parse(fs.readFileSync('committees-current.json'));
var enrich = function(){
	committees.forEach(function(c){
		var members = committeeMembership[c.thomas_id];
		members.forEach(function(m){
			var i, found;
			for(i=0, found = false; i< legislators.length && false === found; i++){
				if(legislators[i].bioguide_id === m.bioguide){
					if(typeof legislators[i].committeeMembership == 'undefined'){
						legislators[i].committeeMembership = [];
					}
					if(typeof m.title != 'undefined'){
						legislators[i].committeeMembership.push(c.name + " - " + m.title);
					} else {
						legislators[i].committeeMembership.push(c.name);
					}

				}
			}
		});
	});
};
enrich();





var retobj = {};
var sunlight = function(req, res, page){
	request('https://congress.api.sunlightfoundation.com/bills/search?apikey=1872af8ee52349d1a0b1f7e001d53b46&per_page=50&'+
			'order=introduced_on&'+
			'fields=sponsor_id,short_title,official_title&'+//these are the only fields we currently care about a bill. Limiting fields improves response time
			'page='+page+
			'&query='+req.query.query, 
			function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var returned = JSON.parse(body);
			retobj.bills = returned.count;
			var results = returned.results;
			var numberOfBills = results.length;
			console.log("#:" + numberOfBills + ", Count: " + returned.count + ", Page: " + page);
			
			results.forEach(function(b){//for each bill
				legislators.forEach(function(l){
					if(l.bioguide_id === b.sponsor_id){
						// super super ineffiencent; check to see if we have already found this person
						var i;
						var found = false;
						for(i = 0; i<retobj.people.length; i++){
							if(retobj.people[i].bioguide_id === l.bioguide_id){
								retobj.people[i].billsShort.push(b.short_title);
								retobj.people[i].billsLong.push(b.official_title);
								retobj.people[i].billsId.push(b.bill_id);
								found = true;
							}
						}
						if(found === false){
							var person = l;
							person.billsShort = [];
							person.billsLong = [];
							person.billsId = [];							
							person.billsShort.push(b.short_title);
							person.billsLong.push(b.official_title);
							person.billsId.push(b.bill_id);
							retobj.people.push(person);
						}
					} 
				})
			});
			if((page*50 > returned.count|| page > 30) ){
				// return the enriched list of legislators
			    res.json(retobj);
			    res.end(); // exit
			} else {
				sunlight(req, res, page+1);
			}
			
		  } else{ // on failure
			  res.json({message:504});
			  res.end();//exit
		  }
		  
		})
};

router.get('/sunlight', function(req, res){
	retobj = {};
	retobj.people = [];// reset the return object
	sunlight(req, res, 1);
});

var retobj = {};
var getBillInfo = function(req, res, page){
	console.log('making bill request');
	request('https://congress.api.sunlightfoundation.com/bills?apikey=1872af8ee52349d1a0b1f7e001d53b46&per_page=50&'+
			'order=introduced_on&'+
			'fields=sponsor_id,short_title,popular_title,keywords,cosponsors,nicknames,official_title&'+//these are the only fields we currently care about a bill. Limiting fields improves response time
			'page='+page+
			'&bill_id='+req.query.query, 
		function (error, response, body) {
			console.log('query success');
			if (!error && response.statusCode == 200) {
				//console.log(body) ;// Show the HTML for the Google homepage.
				var returned = JSON.parse(body);
				retobj.billCount = returned.count;
				retobj.bills = returned;
				var results = returned.results;
				var numberOfBills = results.length;
				console.log("#:" + numberOfBills + ", Count: " + returned.count + ", Page: " + page);
				res.json({data : retobj});
				res.end();//exit
								
			  } else{ // on failure
				  res.json({message:response.statusCode});
				  res.end();//exit
			  }
			  
			})
};



router.get('/billinfo', function(req, res){
	retobj = {};
	retobj.people = [];// reset the return object
	getBillInfo(req, res, 1);
});

app.use('/api', router);



// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);	

app.get('*', function(req, res){
    res.render('index.html');
});

console.log('Magic happens on port ' + port); 			// shoutout to the user

exports = module.exports = app; 						// expose app


