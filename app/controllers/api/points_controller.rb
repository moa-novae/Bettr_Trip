module API
  class PointsController < ApplicationController

    def index
      trip_id = params[:trip_id].to_i
      @points = Point.where(trip_id: trip_id).order(start_time: :asc)

      render :json => {
        points: @points
      }
    end

    def create
      puts "PARAMS---- #{params}"
      puts "PARAMS---- #{add_point_params}"
      @point = Point.new(add_point_params)
      @point.save
    end

    # def delete
    #   puts "DELETE PARAMS - #{delete_point_params}"
    #   # @point = Point.find_by(latitude: delete_point_params[:latitude], longitude: delete_point_params[:longitude])
    # end
  
  
    private
  
    def add_point_params
      params.require(:point).permit(:name, :region, :latitude, :longitude, :trip_id)
    end

    def delete_point_params
      params.require(:point).permit(:latitude, :longitude)
    end
  end
end