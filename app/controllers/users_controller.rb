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
      render json: {
        status: :created, 
        user: user
      }
    else
      render json: { status: 500 }
    end
  end

  def show
    profile = TripUser.where(user_id: params[:user_id])
    puts profile
  end
end
