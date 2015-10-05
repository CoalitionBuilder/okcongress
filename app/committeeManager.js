var request = require('request');

/////////////////////////////////////////////////////////////
// All Committees
/////////////////////////////////////////////////////////////
exports.getCommittees = function(callback){
    // console.log("Fetching committees");
    request('https://www.govtrack.us/api/v2/committee?limit=6000',
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // console.log('Successfully fetched Committees');
                // console.log(body)
                // res.json({body : body})
                callback(null, JSON.parse(body));
            } else{ // on failure
                callback({message:response.statusCode});
            }
        })
};
