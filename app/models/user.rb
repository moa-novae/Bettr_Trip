class User < ActiveRecord::Base
  has_and_belongs_to_many :trips
  has_secure_password
end