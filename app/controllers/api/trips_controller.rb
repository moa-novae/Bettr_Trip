module API
  class TripsController < ApplicationController
    
    CAR = 'CAR'
    WALK = 'WALK'
    BICYCLE = 'BICYCLE'
    TRANSIT = 'TRANSIT'

    def index
      render :json => {
        message: "This is the trip page! (It shows the trip!)",
        trip: {day1: {point1: {longitude: -79.402189, latitude: 43.644236, start_time: '09:00:00', end_time: '10:00:00', travel_method: TRANSIT}, 
                      point2: {longitude: -79.387109, latitude: 43.642783, start_time: '10:30:00', end_time: '11:30:00', travel_method: CAR}, 
                      point3: {longitude: -79.365436, latitude: 43.684822, start_time: '12:30:00', end_time: '13:30:00', travel_method: WALK}, 
                      point4: {longitude: -79.380823, latitude: 43.655005, start_time: '14:00:00', end_time: '15:45:00', travel_method: CAR}}, 
              day2: {point1: {longitude: -79.402189, latitude: 43.644236, start_time: '10:30:00', end_time: '11:30:00', travel_method: TRANSIT}, 
                      point2: {longitude: -79.387109, latitude: 43.642783, start_time: '11:45:00', end_time: '12:00:00', travel_method: TRANSIT}, 
                      point3: {longitude: -79.365436, latitude: 43.684822, start_time: '12:30:00', end_time: '21:00:00', travel_method: TRANSIT}}, 
              day3: {point1: {longitude: -79.402189, latitude: 43.644236, start_time: '7:30:00', end_time: '18:30:00', travel_method: BICYCLE}, 
                      point2: {longitude: -79.387109, latitude: 43.642783, start_time: '20:00:00', end_time: '22:00:00', travel_method: BICYCLE}}
              }
      }
    end

    def create
      trip = Trip.new(trip_params)
      trip.save
      p trip_user_params

      trip_user = TripUser.new(trip_id: trip.id, user_id: 9)
      trip_user.save
      render json: { trip_id: trip.id }
    end

    private

    def trip_params
      params.require(:trip).permit(:name, :start_date, :end_date)
    end

    def trip_user_params
      params.require(:trip_user).permit(:user_id)
    end
  end
end