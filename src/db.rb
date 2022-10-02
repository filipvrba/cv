module DB
  class Project
    attr_accessor :id_name, :project_json

    def initialize id_name
      @id_name = id(id_name)
      @project_json = JsonParser.new Migration::absolute_path("share/projects.json")
    end

    def id name
      name.gsub(/[\–\-\/\|\,\.=]/, "").split.join("_").downcase
    end

    def name
      parse("name", nil)
    end

    def name=(value)
      parse("name", value)
    end

    def description
      parse("description", nil)
    end

    def description=(value)
      parse("description", value)
    end

    def author
      parse("author", nil)
    end

    def author=(value)
      parse("author", value)
    end

    def time
      Time.at parse("time", nil).to_i
    end

    def time=(value)
      parse("time", value.to_i)
    end

    def parse key, value
      # @projects_json.parse key, value
      @project_json.parse [@id_name, key], value
    end
  end

  class Migration
    ROOT_PATH = "../.."

    def self.absolute_path path
      File.absolute_path("#{ROOT_PATH}/#{path}", __FILE__)
    end
  end
end