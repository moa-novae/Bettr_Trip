module API
  class PointsController < ApplicationController

    def index
      trip_id = params[:trip_id].to_i
      @points = Point.where(trip_id: trip_id)

      render :json => {
        message: "To be added data for each unique URL", 
        ARR: @points
      }
    end
  end
end