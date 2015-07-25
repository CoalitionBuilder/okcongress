var request = require('request');

/////////////////////////////////////////////////////////////
// All Committees
/////////////////////////////////////////////////////////////
exports.getCommittees = function(req, res, page){
    console.log("Fetching committees");
	request('https://www.govtrack.us/api/v2/committee?limit=6000', 
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
                console.log('Successfully fetched Committees');
                // console.log(body)
                // res.json({body : body})
			} else{ // on failure
			  res.json({message:response.statusCode});
			  res.end();//exit
			}		  
		})
};
