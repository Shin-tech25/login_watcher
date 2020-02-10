class MessagesController < ApplicationController
  helper_method :is_exist_favorite

  def index
    @favorites = Favorite.where(user_id: current_user.id)
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

  def is_exist_favorite(userId, messageId)
    favorite = Favorite.where(user_id: userId, message_id: messageId, favorite: true)
    if favorite.present?
      return true
    else
      return false
    end
  end

end