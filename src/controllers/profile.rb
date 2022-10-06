require "sinatra/security"
require_relative "../base/indigo"

module Controllers
  class Profile < Indigo::Base
    include Sinatra::Security

    def initialize
      super

      @profile = @db.profile
      @invalid = false
    end

    def data(symbol, value = nil)
      @db.profile.parse symbol, value
    end

    get "/odhlasit-se" do
      cookies[:autotarized] = "false"
      
      redirect "/"
    end

    get "/prihlasit-se" do
      if params["email"] == @profile.parse(:email)
        check = Password::Hashing.check(params["password"], @profile.parse(:password))

        if check
          cookies[:autotarized] = "true"
          @invalid = false
          
          redirect "/"
        else
          @invalid = true
        end
      end

      ren("profile/sign_in")
    end

    get "/nastaveni" do

      autotarized :profile do
        ren(:root) do
          erb @via.render "profile/edit"
        end
      end
    end

    post "/nastaveni" do

      autotarized :profile do
        @is_save = true

        params.each do |k, v|
          data(k, v)
        end

        ren(:root) do
          erb @via.render "profile/edit"
        end
      end
    end
  end
end