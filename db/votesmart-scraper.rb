require 'csv'
require 'nokogiri'
require 'open-uri'

# iterate over each interest group's votesmart url
# pull all relevant anchor tags, write to scorecards
CSV.open('scorecards.csv', 'w') do |csv|
  CSV.foreach('interest_groups.csv') do |row|
    p row[1]
    doc = Nokogiri::HTML(open(row[1]))
    anchors = doc.css('li a').select {|anchor| anchor.to_s.include? 'rating'}
    anchors.each do |a|
      csv << [a.attr('href')]
    end
  end
end

# parse the scorecards csv, creating scorecards