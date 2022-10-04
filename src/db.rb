require 'singleton'

module Indigo
  class DB
    include Singleton
    attr_reader :root, :projects, :profile

    def initialize
      @root     = JsonParser.new abs_path("share/root.json")
      @projects = JsonParser.new abs_path("share/projects.json")
      @profile  = JsonParser.new abs_path("share/profile.json")
    end

    private
    def abs_path rel_path
      File.absolute_path("#{ROOT_PATH_DB}/#{rel_path}", __FILE__)
    end
  end
end