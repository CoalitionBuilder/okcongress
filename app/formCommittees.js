var fs = require('fs');


exports.enrich = function(results){
	fs.writeFileSync('allData.json', results);
	var committees = JSON.parse(fs.readFileSync('allData.json'));
	// console.log(committees[0].meta)
	// committees.forEach(function(c){
	// 	var members = committeeMembership[c.thomas_id];
	// 	members.forEach(function(m){
	// 		var i, found;
	// 		for(i=0, found = false; i< legislators.length && false === found; i++){
	// 			if(legislators[i].bioguide_id === m.bioguide){
	// 				if(typeof legislators[i].committeeMembership == 'undefined'){
	// 					legislators[i].committeeMembership = [];
	// 				}
	// 				if(typeof m.title != 'undefined'){
	// 					legislators[i].committeeMembership.push(c.name + " - " + m.title);
	// 				} else {
	// 					legislators[i].committeeMembership.push(c.name);
	// 				}
	// 			}
	// 		}
	// 	});
	// });
};
