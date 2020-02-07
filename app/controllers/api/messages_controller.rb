class Api::MessagesController < ApplicationController
  def index
    last_message_id = params[:id].to_i
    @messages = Message.includes(:user).where("id > ?", last_message_id)
  end
end

