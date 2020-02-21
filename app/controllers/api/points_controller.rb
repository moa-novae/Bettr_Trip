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
      puts "UPDATE-----point_id = #{params[:id]}"
      puts "THESE ARE THE PARAMS = #{params[:start_time]}"
      Point.update(params[:id], :name => params[:name], :start_time => params[:start_time], :end_time => params[:end_time],
      :activity => params[:activity], :travel_method => params[:travel_method], :travel_duration => params[:travel_duration])
      
    end




  
    private
  
    def point_params
      params.require(:point).permit(:name, :region, :latitude, :longitude, :trip_id, :start_time, :end_time, :activity, :travel_method, :travel_duration)
    end
  end
end