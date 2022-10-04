require_relative "src/controllers/root"
require_relative "src/controllers/projects"
require_relative "src/controllers/profile"

require_relative "src/application/indigo"

require_relative "src/db"
require "sinatra/router"

use Sinatra::Router do
  mount Controllers::Root
  mount Controllers::Projects
  mount Controllers::Profile
end
run Indigo::Application
