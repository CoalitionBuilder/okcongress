var request = require('request');

/////////////////////////////////////////////////////////////
// All Legislators
/////////////////////////////////////////////////////////////
exports.getLegislators = function(callback){
    // console.log("Fetching legislators");
    request('https://www.govtrack.us/api/v2/role?current=true&limit=6000',
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // console.log('Successfully fetched Legislators');
                // console.log(body)
                // res.json({body : body})
                callback(null, body);
            } else{ // on failure
                callback({message:response.statusCode}, null);
            }
        })
};