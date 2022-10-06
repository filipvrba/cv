module Indigo
  class Application < Sinatra::Application

    configure do
      set :root, File.absolute_path("#{ROOT_PATH_CNF}", __FILE__)
    end
  end
end
