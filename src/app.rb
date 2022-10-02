require_relative "application/indigo"
require_relative "controllers/projects"

class App < Indigo::Application

  include Controllers::Projects

  def initialize
    super

    @name_app = "Indigo"
    @menu = @db.parse :menu
    @year = Time.new.year
    @fullname = @db.parse :fullname
  end

  get "/" do
    ren(:root) do
      erb @via.render "root/home"
    end
  end

  get "/cv" do
    @avatar = @profile.parse :avatar
    @name = @profile.parse :name
    @bio = @profile.parse :bio
    @school = @profile.parse :school
    @address = @profile.parse :address
    @experiences = @profile.parse :experiences

    ren(:root) do
      erb @via.render "root/cv"
    end
  end

  not_found do
    ren(:root) do
      erb @via.render "not_found"
    end
  end
end
