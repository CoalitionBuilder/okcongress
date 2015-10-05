var request = require('request');

/////////////////////////////////////////////////////////////
// All Committee Members
/////////////////////////////////////////////////////////////
exports.getCommitteeMembers = function(callback){
    // console.log("Fetching committee members");
    request('https://www.govtrack.us/api/v2/committee_member',
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

