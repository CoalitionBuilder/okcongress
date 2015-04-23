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

  var populatePositions = function(issue) {
    $.ajax({
      type: "GET",
      url: "/positions",
      data: {issue: issue}
    }).done(function(positions) {
      $("#position-container").empty();
      positions.forEach(function(position) {
        var positionString = "<p class='position-description'>" + position.description + "</p>";
        $("#position-container").append(positionString)
      })
    })
  }

  $('.typeahead').bind('typeahead:selected', function() {
    var input = $(".tt-cursor").text()
    populatePositions(input);
  });
}

$(document).ready(function() {
  initializeSearch();
})