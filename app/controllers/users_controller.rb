class UsersController < ApplicationController
  def new
    render :json => {
      message: "This is the signup page!"
    }
  end

  def create
    user = User.create!(
      email: params['user']['email'],
      password: params['user']['password'],
      password_confirmation: params['user']['password_confirmation']
    )
    if user
      session[:user_id] = user.id
      puts session
      render json: {
        status: :created, 
        user: user
      }
    else
      render json: { status: 500 }
    end
  end

  def show
    user = User.find(params[:user_id])
    profile = user.trips
    puts profile

    render json: {
      status: :user_trip_created, 
      profile_trip: profile
    }
  end

  def trip
    trip_data = Trip.find_by(id: params[:trip_id])
    p "#{trip_data} gg"

    render json: {
      status: :trip_data_created, 
      trip_data: trip_data
    }
  end
end
