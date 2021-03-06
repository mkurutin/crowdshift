require 'api/crowdshift_service'

class EventsController < ApplicationController

  def new
    @event = Event.new
  end

  def create
    event_api_id = Api::CrowdshiftService.new.create_event["id"]
    event = Event.create params[:event].merge({:event_api_id => event_api_id})
    redirect_to :action => 'show', :id => event.id
  end

  def show
    @event = Event.find params[:id]
    @attendance = Api::CrowdshiftService.new.get_attendance(@event.event_api_id, @event.start_date, @event.end_date)
  end
end
