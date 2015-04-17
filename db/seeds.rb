json = ActiveSupport::JSON.decode(File.read('db/sigs.json'))

json["data"].each do |data|
  sig = {}

  ["name", "description", "url"].each do |field|
    sig[field] = data[field] ? data[field].first : "Incomplete"
  end

  Sig.create sig
end