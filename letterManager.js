var request = require('request');

/////////////////////////////////////////////////////////////
// All Letters
/////////////////////////////////////////////////////////////
exports.getLetters = function(req, res, page){
    console.log("Fetching committees");
	request('http://legisletters.com/elasticsearch/legisletters/letter/_search', 
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
                console.log('Successfully fetched Letters');
                res.json({body : body})
			} else{ // on failure
			  res.json({message:response.statusCode});
			  res.end();//exit
			}		  
		})
};



// http://legisletters.com/?source=%7B%22query%22%3A%7B%22query_string%22%3A%7B%22query%22%3A%22fracking%22%2C%22default_operator%22%3A%22OR%22%7D%7D%2C%22from%22%3A0%2C%22size%22%3A10%7D


