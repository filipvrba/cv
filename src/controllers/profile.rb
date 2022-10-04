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

    get "/odhlasit-se" do
      @db.root.parse :autotarized, "false"
      
      redirect "/"
    end

    get "/prihlasit-se" do
      if params["email"] == @profile.parse(:email)
        check = Password::Hashing.check(params["password"], @profile.parse(:password))

        if check
          @db.root.parse :autotarized, "true"
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
  end
end