class Event < ActiveRecord::Base
  attr_accessible :name, :description, :start_date, :end_date, :event_api_id, :location
end
