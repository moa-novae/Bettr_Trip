module API
  class PointsController < ApplicationController

    def index
      trip_id = params[:trip_id].to_i
      @points = Point.where(trip_id: trip_id)

      render :json => {
        message: "To be added data for each unique URL", 
        points: @points
      }
    end

    def create
      puts "PARAMS---- #{params}"
      puts "PARAMS---- #{point_params}"
      @point = Point.new(point_params)
      @point.save
    end
  
  
    private
  
    def point_params
      params.require(:point).permit(:name, :region, :latitude, :longitude, :trip_id)
    end
  end
end