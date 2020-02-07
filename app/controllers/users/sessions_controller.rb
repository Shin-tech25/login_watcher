# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]
  before_action :set_current_user

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  def create
    super
    user = User.find(current_user.id)
    user.update(status: true)
    # @current_user.update(status: true)
  end

  # DELETE /resource/sign_out
  def destroy
    user = User.find(current_user.id)
    user.update(status: false)
    user.update(last_login: Time.current)
    super
  end

  def set_current_user
    @current_user = User.find_by(id: session[:user_id])
  end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
