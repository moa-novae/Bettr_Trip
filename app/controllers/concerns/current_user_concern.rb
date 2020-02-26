module CurrentUserConcern
  extend ActiveSupport::Concern

  included do 
    before_action :set_current_user
  end

  def set_current_user
    puts "'#{self.session[:user_id].inspect}'' !!!!!!!!!!!!!!!!!!!"
    if self.session[:user_id]
      @current_user = User.find(self.session[:user_id])
    end
  end
end