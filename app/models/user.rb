class User < ActiveRecord::Base
  has_and_belongs_to_many :trips
  has_secure_password

  validates :email, uniqueness: { case_sensitive: false }
  validates :password, confirmation: true
  validates :password_confirmation, presence: true

end