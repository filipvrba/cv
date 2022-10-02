module Controllers
  module Projects
    class Sinatra::Application
      ROOT_PATH = "../../.."

      def initialize
        super

        @projects = JsonParser.new File.absolute_path("#{ROOT_PATH}/share/projects.json", __FILE__)
      end

      def time id
        Time.at( @projects.parse([id, :time]).to_i ).strftime("%d. %m. %Y")
      end

      def id name
        name.gsub(/[-,.]/, " ").split.join("_").downcase
      end

      post "/projects" do
        project = {
          "name" => params["name"],
          "description" => params["description"],
          "author" => @fullname,
          "time" => Time.now.to_i
        }
        @projects.parse( id(params["name"]), project)

        redirect "/projects"
      end

      get "/projects" do
        ren(:root) do
          erb @via.render "projects/index"
        end
      end

      get "/projects/create" do
        ren(:root) do
          erb @via.render "projects/create"
        end
      end

      get "/projects/{name}" do |name|
        @project = @projects.parse(name)
        @id_name = name

        if @project
          ren(:root) do
            erb @via.render "projects/project"
          end
        else
          ren(:root) do
            erb @via.render "not_found"
          end
        end
      end

      post "/projects/:n" do |name|
        params.each do |k, v|
          unless k == "n"
            @projects.parse([name, k], v)
          end
        end

        @project = @projects.parse(name)
        @id_name = name
        
        ren(:root) do
          erb @via.render "projects/project"
        end
      end 

      get "/projects/{name}/edit" do |name|
        @id_name = name
        @project = @projects.parse(@id_name)

        ren(:root) do
          erb @via.render "projects/edit"
        end
      end

      post "/projects/{name}/delete" do |name|
        @projects.delete name

        redirect "/projects"
      end
    end
  end
end