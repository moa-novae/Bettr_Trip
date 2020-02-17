class TripsController < ApplicationController
  def index
    render :json => {
      message: "This is the trip page! (It shows the trip!)"
    }
  end

  def show
    render :json => {
      message: "To be added data for each unique URL"
    }
  end
  
end
