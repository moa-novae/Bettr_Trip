require 'test_helper'

class BinControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get bin_index_url
    assert_response :success
  end

end
