var request = require('request');

/////////////////////////////////////////////////////////////
// All Letters
/////////////////////////////////////////////////////////////


exports.getLettersByTopic = function(topic){
    // console.log("Fetching letters");
    var qry = '{"query":{"query_string":{"query":"'+topic+'","default_operator":"OR"}},"from":0,"size":10,"facets":{"hostLegislator.term.type":{"terms":{"field":"hostLegislator.term.type","size":110,"order":"count"}},"hostLegislator.term.party":{"terms":{"field":"hostLegislator.term.party","size":110,"order":"count"}},"hostLegislator.name.official_full.raw":{"terms":{"field":"hostLegislator.name.official_full.raw","size":110,"order":"count"}},"hostLegislator.term.state":{"terms":{"field":"hostLegislator.term.state","size":150,"order":"count"}}},"highlight":{"fields":{"_all":{"fragment_size":150},"text":{},"pressReleaseText":{},"signatures":{},"recipients":{}}}}'

    var options = { 
      method: 'GET',
      url: 'http://legisletters.com/elasticsearch/legisletters/letter/_search',
      qs: { source:  qry} 
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
 
      // callback(null, body)
    });

};


