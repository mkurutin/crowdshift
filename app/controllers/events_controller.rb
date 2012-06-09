require 'api/crowdshift_service'

class EventsController < ApplicationController

  def new
    @event = Event.new
  end

  def create
    event_api_id = Api::CrowdshiftService.new.create_event.parsed_response["id"]
    event = Event.create params[:event].merge({:event_api_id => event_api_id})
    redirect_to :action => 'show', :id => event.id
  end

  def show
    @event = Event.find params[:id]
  end
end
