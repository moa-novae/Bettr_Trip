class PointsController < ApplicationController

  # def show
  #   @points = Trip.points.all
  # end

  def create
    @point = Point.new(params)
  end


end
