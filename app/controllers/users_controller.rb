class UsersController < ApplicationController
  def index
    db_attend = User.where(status: true).count
    db_users = User.all.count
    if db_attend != params[:attend].to_i || db_users != params[:users].to_i
      @users = User.all
    else
      return nil
    end

    respond_to do |format|
      format.html
      format.json
    end
  end

end
