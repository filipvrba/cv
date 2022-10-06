require_relative "../base/indigo"

module Controllers
  class Api < Indigo::Base
    before do
      content_type "application/json"
    end

    get "/api/projects" do
      JSON.pretty_generate(@db.projects.db)
    end
  end
end
