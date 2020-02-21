module API
  class PointsController < ApplicationController

    def index
      trip_id = params[:trip_id].to_i
      @points = Point.where(trip_id: trip_id).where.not(start_time: nil).order(start_time: :asc)

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
      @point.name = params[:name]
      @point.latitude = params[:latitude]
      @point.longitude = params[:longitude]
      @point.start_time = params[:start_time]
      @point.end_time = params[:end_time]
      @point.trip_id = params[:trip_id]
      @point.region = params[:region]
      @point.activity = params[:activity]
      @point.travel_method = params[:travel_method]
      @point.travel_duration = params[:travel_duration]
      @point.save
    end

    def show
      @point = Point.find_by(id: params[:id])
      puts "SHOW-----point_id = #{params[:id]}"
      render :json => {
        point: @point
      }
    end
  
    private
  
    def point_params
      params.require(:point).permit(:name, :region, :latitude, :longitude, :trip_id, :start_time, :end_time, :activity, :travel_method, :travel_duration)
    end
  end
end