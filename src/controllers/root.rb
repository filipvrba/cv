require_relative "../base/indigo"

module Controllers
  class Root < Indigo::Base
    get "/" do
      ren(:root) do
        erb @via.render "root/home"
      end
    end
  end
end
