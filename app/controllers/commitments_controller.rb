require 'api/crowdshift_service'

class CommitmentsController < ApplicationController

  def new
    @event = Event.find(params[:event_id])
  end

  def create
    event_api_id = Event.find(params[:event_id]).event_api_id
    response = Api::CrowdshiftService.new.create_commitment(event_api_id, DateTime.strptime(params[:start_date], "%m/%d/%Y %H:%M"), DateTime.strptime(params[:end_date], "%m/%d/%Y %H:%M"))
    redirect_to :controller => :events, :action => :show, :id => params[:event_id]
  end

end
