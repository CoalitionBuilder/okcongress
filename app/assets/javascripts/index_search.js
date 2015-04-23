var initializeSearch = function() {
  var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
      var matches, substrRegex;
      matches = [];
      substrRegex = new RegExp(q, 'i');
      $.each(strs, function(i, str) {
        if (substrRegex.test(str)) {
          matches.push({ value: str });
        }
      });
      cb(matches);
    };
  };

  var setTypeAhead = function(suggestions) {
    $('.typeahead').typeahead({
      hint: false,
      highlight: true,
      minLength: 1
    },
    {
      displayKey: 'value',
      source: substringMatcher(suggestions)
    });
  }

  $.ajax({
    type: "GET",
    url: "/issues"
  }).done(function(response) {
    var issueNames = response.map(function(data){
      return data.description
    })
    setTypeAhead(issueNames);
  })
}

$(document).ready(function() {
  initializeSearch();
})