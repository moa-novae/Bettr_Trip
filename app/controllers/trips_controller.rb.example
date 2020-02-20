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


  def show
    render :json => {
      message: "To be added data for each unique URL"
    }
  end

end
