Sig.create!(name: "Campaign for Working Families", url: "http://www.cwfpac.com/", description: "CWF has used its resources to raise public awareness of partial-birth abortion through extensive media campaigns and distributed two million pieces of literature through our voter education program.")
Issue.create!(description: "Abortion")

Sig.all.each do |sig|
  sig.position.create!
end

Position.create!(issue_id: 1, description: "Pro-life")
Position.create!(issue_id: 1, description: "Pro-DOMA")

Legislator.create!(name: "Lisa Murkowski", office: "Senate", state: "AK", party: "Republican", votesmart_url: "http://votesmart.org/candidate/15841/lisa-murkowski#.VS1QApTF8o0", img_url: "http://votesmart.org/canphoto/15841.jpg")


Rating.create!(legislator_id: 1, sig_id: 1, position_id: 1, score: 50, year: 2014)
Rating.create!(legislator_id: 1, sig_id: 1, position_id: 2, score: 50, year: 2014)


# seed all sigs
  # Sig.create!
# seed all positions
  # sig.positions.create!

# for each scorecard csv:
  # Legislator.create!
  # iterate over sig.positions
    # iterate over each record
      # Rating.create!