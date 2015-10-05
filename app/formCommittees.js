var fs = require('fs');


exports.enrich = function(results){
	fs.writeFileSync('allData.json', results);
	var file = fs.readFileSync('allData.json');

	var legislators = results[0].objects;
	var committees  = results[1].objects;
	var committeeMembership = JSON.parse(fs.readFileSync('app/committee-membership-current.json'))
	// console.log(committees[0])
	// var committeeMembership = results[2];
	// console.log(committeeMembership)
	// console.log(Object.keys(committeeMembership))
	// console.log(committees.objects)
	// var json = JSON.parse(file);
	// var committees = JSON.parse(fs.readFileSync('allData.json'));

	// console.log(committees[0].meta)
	committees.forEach(function(c){
		if(c.committee !== null){
			var members = committeeMembership[c.committee.code];	
			members.forEach(function(m){
				var i, found;
				for(i=0, found = false; i< legislators.length && false === found; i++){
					if(legislators[i].person.bioguideid === m.bioguide){
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
		}
	});
	return legislators
};
