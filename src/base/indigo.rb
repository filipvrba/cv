require_relative "../application/via"
require_relative "../db"
require_relative "../constants"
require_relative "../helper"

require 'sinatra/base'
require "sinatra/reloader"

require "pandoc-ruby"

module Indigo
  class Base < Sinatra::Base
    attr_reader :via, :db

    configure :development do
      register Sinatra::Reloader
    end

    def initialize
      super

      @via = Via::Application.new
      # @db = DB.new
      @db = Indigo::DB.instance
    end

    def ren symbol, &callback
      erb @via.render LAYOUT do
        erb @via.render symbol do
          callback.call
        end
      end
    end

    def autotarized symbol, &callback
      if @db.root.parse(:autotarized) == "true"
        callback.call
      else
        ren(:root) do
          erb @via.render "#{ symbol.to_s }/autotarized"
        end
      end
    end

    not_found do
      ren(:root) do
        erb @via.render "not_found"
      end
    end
  end
end
