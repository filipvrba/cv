require_relative "application/indigo"

class App < Indigo::Application

  def initialize
    super

    @name_app = "Indigo"
    @fullname = @db.parse :fullname
    @menu = @db.parse :menu
    @year = Time.new.year
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
end
