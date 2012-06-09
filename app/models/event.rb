class Event < ActiveRecord::Base
  attr_accessible :name, :description, :start_date, :end_date
end
