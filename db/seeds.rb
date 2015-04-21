sig_json = ActiveSupport::JSON.decode(File.read('db/sigs.json'))

sig_json["data"].each do |data|
  sig = {}

  ["name", "description", "url"].each do |field|
    sig[field] = data[field] ? data[field][0] : "Incomplete"
  end

  sig["votesmart_id"] = /(?<=interest-group\/)\d+(?=\/)/.match(data["_pageUrl"])[0].to_i
  Sig.create!(sig)
end


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

  VotesmartScorecard.create!(scorecard)
end


require 'csv'

issues = ActiveSupport::JSON.decode(CSV.parse(File.read("db/issues.csv")).to_json)

issues.each do |issue|
  Issue.create!(description: issue[0])
end

# manually seed positions/sigpositions and associate them with some sigs for now, later will need to use labor to create positions/sigpositions for all relevant sigs in db
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