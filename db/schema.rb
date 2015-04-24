# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150424203008) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "issues", force: :cascade do |t|
    t.string   "description", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "legislators", force: :cascade do |t|
    t.string   "name",          null: false
    t.string   "office"
    t.string   "state"
    t.string   "district"
    t.string   "party"
    t.string   "votesmart_url"
    t.string   "img_url"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "positions", force: :cascade do |t|
    t.integer  "issue_id"
    t.string   "description", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "ratings", force: :cascade do |t|
    t.integer  "legislator_id", null: false
    t.integer  "position_id",   null: false
    t.float    "score",         null: false
    t.integer  "year",          null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sig_positions", force: :cascade do |t|
    t.integer "sig_id"
    t.integer "position_id"
  end

  create_table "sigs", force: :cascade do |t|
    t.string   "name",         null: false
    t.string   "url",          null: false
    t.string   "description",  null: false
    t.integer  "votesmart_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "suggestions", force: :cascade do |t|
    t.integer  "sig_id"
    t.string   "position",   limit: 200, null: false
    t.text     "reasoning",              null: false
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "votesmart_scorecards", force: :cascade do |t|
    t.integer "sig_id"
    t.integer "votesmart_sig_id"
    t.integer "year"
    t.string  "votesmart_issues"
    t.integer "pages"
    t.string  "votesmart_url"
  end

end
