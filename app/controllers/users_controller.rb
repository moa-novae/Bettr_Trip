class UsersController < ApplicationController
  def new
    render :json => {
      message: "This is the signup page!"
    }
  end

  def create
    redirect_to '/'
  end
end
