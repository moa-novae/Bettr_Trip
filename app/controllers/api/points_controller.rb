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
      render :json => {
        point: @point
      }
    end
    
    def update
      puts "UPDATE-----point_id = #{params[:id]}"
      puts "THESE ARE THE PARAMS = #{params[:start_time]}"
      Point.update(params[:id], :name => params[:name], :start_time => params[:start_time], :end_time => params[:end_time],
      :activity => params[:activity], :travel_method => params[:travel_method], :travel_duration => params[:travel_duration])
    end
    
  def destroy
    @point = Point.find_by(id: params[:id])
    @point.destroy
  end

    def show
      @point = Point.find_by(id: params[:id])
      puts "SHOW-----point_id = #{params[:id]}"
      render :json => {
        point: @point
      }
    end

    private
    def add_point_params
      params.require(:point).permit(:name, :region, :latitude, :longitude, :trip_id, :start_time, :end_time, :activity, :travel_method, :travel_duration)
    end
    
  end
end