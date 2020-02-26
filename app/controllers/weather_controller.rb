class WeatherController < ApplicationController

  def index
    puts " this is weather #{params[:latitude]}, #{params[:longitude]}"
    self.get_weather_new( params[:latitude],  params[:longitude]) 
  end

  def show
    puts " this is weather #{params[:latitude]}, #{params[:longitude]}"
    self.get_weather_old( params[:latitude],  params[:longitude], params[:time]) 
  end

  def get_weather_new(latitude, longitude)
    response = Excon.get("https://api.darksky.net/forecast/#{ENV['dark_sky']}/#{latitude},#{longitude}?exclude=currently,minutely,hourly,alerts,flags")
    render :json => {
        data: response.body
      }
  end

  def get_weather_old(latitude, longitude, time)
    response = Excon.get("https://api.darksky.net/forecast/#{ENV['dark_sky']}/#{latitude},#{longitude},#{time}?exclude=currently,minutely,hourly,alerts,flags")
    render :json => {
        data: response.body
      }
  end 

end  
