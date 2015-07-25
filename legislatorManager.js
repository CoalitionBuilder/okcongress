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
                res.json({body : body})
            } else{ // on failure
                res.json({message:response.statusCode});
                res.end();//exit
            }
        })
};