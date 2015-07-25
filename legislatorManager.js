var request = require('request');

/////////////////////////////////////////////////////////////
// All Legislators
/////////////////////////////////////////////////////////////
exports.getLegislators = function(req, res, page){
    console.log("Fetching legislators");
    request('https://www.govtrack.us/api/v2/role?current=true&limit=6000',
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log('Successfully fetched Legislators');
                // console.log(body)
                // res.json({body : body})
                callback();
            } else{ // on failure
                callback({message:response.statusCode});
            }
        })
};