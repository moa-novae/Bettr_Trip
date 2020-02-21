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
      puts "PARAMS---- #{point_params}"
      
      @point = Point.new(point_params)
      @point.trip_id = params[:trip_id]
      @point.save!
    end
    
    def update
      @point = Point.find_by(id: params[:id])
      puts "UPDATE-----point_id = #{params[:id]}"
      headers['Access-Control-Allow-Origin'] = '*'
      @point.save
    end




  
    private
  
    def point_params
      params.require(:point).permit(:name, :region, :latitude, :longitude, :trip_id, :start_time, :end_time, :activity, :travel_method, :travel_duration)
    end
  end
end