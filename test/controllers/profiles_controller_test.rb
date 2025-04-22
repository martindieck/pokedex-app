require "test_helper"

class ProfilesControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @user = users(:one) # or create a user dynamically
    sign_in @user
  end

  test "should get show" do
    get profiles_show_url
    assert_response :success
  end
end
