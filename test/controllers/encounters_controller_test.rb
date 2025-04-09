require "test_helper"

class EncountersControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get encounters_new_url
    assert_response :success
  end

  test "should get create" do
    get encounters_create_url
    assert_response :success
  end
end
