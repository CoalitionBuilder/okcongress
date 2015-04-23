require 'csv'
require 'nokogiri'
require 'open-uri'

p "Seeding sigs"
sig_json = ActiveSupport::JSON.decode(File.read('db/sigs.json'))

sig_json["data"].each do |data|
  sig = {}

  ["name", "description", "url"].each do |field|
    sig[field] = data[field] ? data[field][0] : "Incomplete"
  end

  sig["votesmart_id"] = /(?<=interest-group\/)\d+(?=\/)/.match(data["_pageUrl"])[0].to_i
  Sig.create!(sig)
end

p "Seeding votesmart scorecards"
votesmart_scorecard_json = ActiveSupport::JSON.decode(File.read('db/scorecards.json'))

votesmart_scorecard_json["data"].each do |data|
  scorecard = {}

  scorecard["votesmart_sig_id"] = /(?<=interest-group\/)\d+(?=\/)/.match(data["sig_name"][0])[0].to_i

  sig_match = Sig.find_by(votesmart_id: scorecard["votesmart_sig_id"])
  scorecard["sig_id"] = sig_match ? sig_match.id : "Incomplete"

  year_match = /\d{4}/.match(data["year"][0])
  scorecard["year"] = year_match ? year_match[-1].to_i : "Incomplete"

  scorecard["votesmart_issues"] = data["votesmart_issues"][0]

  scorecard["pages"] = data["pages"] ? /\d/.match(data["pages"][0])[-1].to_i : 1

  scorecard["votesmart_url"] = data["_pageUrl"]

  VotesmartScorecard.create!(scorecard)
end

p "Seeding issues/positions"
issues = ActiveSupport::JSON.decode(CSV.parse(File.read("db/issues.csv")).to_json)

issues.each do |issue|
  Issue.create!(description: issue[0])
end

# Seed positions/sig_positions manually for now, later will need to use labor
pro_choice = Position.create!(issue_id: 1, description: "Pro-choice")
pro_life = Position.create!(issue_id: 1, description: "Pro-life")

pro_choice_entities = ["National Family Planning & Reproductive Health Association", "National Organization for Women", "Planned Parenthood Action Fund", "Population Action International", "Population Connection", "The Population Institute", "Women's Campaign Fund"]

pro_life_entities = ["Campaign for Working Families", "CitizenLink", "Democrats for Life of America", "Emily's List", "NARAL Pro-Choice America", "National Right to Life Committee", "Republican National Coalition for Life PAC", "Susan B. Anthony List"]

pro_life_entities.each do |ple|
  sig = Sig.find_by(name: ple)
  SigPosition.create!(sig_id: sig.id, position_id: pro_life.id)
end

pro_choice_entities.each do |pce|
  sig = Sig.find_by(name: pce)
  SigPosition.create!(sig_id: sig.id, position_id: pro_choice.id)
end

p "Seeding legislators/ratings"

year_threshold = 2014
scorecards_to_seed = VotesmartScorecard.where("year >= ?", year_threshold)
p "Seeding #{scorecards_to_seed.count} scorecards"
counter = 1
scorecards_to_seed.each do |scorecard|
  p "#{counter} of #{scorecards_to_seed.count}"
  page = Nokogiri::HTML(open(scorecard.votesmart_url))
  sig = Sig.find_by(name: page.css('h3 a').text)
  rows = page.css('tr')[1..-1]
  rows.each do |row|
    legislator = Legislator.find_or_create_by(
      name: row.children[7].text,
      office: row.children[3].text,
      state: row.children[1].text,
      district: row.children[5].text,
      party: row.children[9].text,
      votesmart_url: row.children[7].css('a')[0] ? row.children[7].css('a')[0]['href'] : "Unavailable"
      )
    sig.positions.each do |position|
      position.ratings.create!(legislator_id: legislator.id, score: row.children[11].text.to_i, year: year_threshold) # TODO: fix this to identify a given scorecard's year
    end
  end
  counter += 1
end
