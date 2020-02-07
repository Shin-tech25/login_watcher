class MessagesController < ApplicationController

  def index
    @message = Message.new
    @messages = Message.includes(:user).all
    @attends = User.where(status: true)
    @absents = User.where(status: false)
  end

  def create
    @message = Message.new(message_param)
    if @message.save
      respond_to do |format|
        format.json
      end
    else
      redirect_to root_path
    end
  end

  def message_param
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def message_save
    @message.save
  end

end