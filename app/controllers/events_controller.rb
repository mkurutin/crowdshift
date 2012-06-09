class EventsController < ApplicationController

  def new
    @event = Event.new
  end

  def create
    event = Event.create params[:event]
    redirect_to :action => 'show', :id => event.id
  end

  def show
    @event = Event.find params[:id]
  end
end
