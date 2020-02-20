class PointsController < ApplicationController

  # def show
  #   @points = Trip.points.all
  # end

  def index
    points = Point.all
    render json: { points: points }
  end

  def create
    puts "PARAMS---- #{params}"
    puts "PARAMS---- #{point_params}"
    @point = Point.new(point_params)
    @point.save
  end


  private

  def point_params
    params.require(:point).permit(:name, :latitude, :longitude)
  end

end
