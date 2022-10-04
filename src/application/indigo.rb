module Indigo
  class Application < Sinatra::Application

    configure do
      set :public_folder, File.absolute_path("#{ROOT_PATH_CNF}/public", __FILE__)
      set :root         , File.absolute_path("#{ROOT_PATH_CNF}", __FILE__)
    end
  end
end
