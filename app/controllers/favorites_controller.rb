class FavoritesController < ApplicationController
  after_action :reset_check_mark, only: [:index]

  def create
    param_message_id = params[:message_id]
    favorite_a = Favorite.where(user_id: current_user.id, message_id: param_message_id)
    favorite_b = Favorite.where(user_id: current_user.id, message_id: param_message_id, favorite: true)
    
    if favorite_a.blank?
      Favorite.create(user_id: current_user.id, message_id: param_message_id, favorite: true)
      @message = Message.find(param_message_id)
      favo_counts = Favorite.where(message_id: param_message_id, favorite: true).count
      @message.update(favocounts: favo_counts)

      @favorite = Favorite.where(user_id: current_user.id, message_id: param_message_id)
      respond_to do |format|
        format.json
      end
    elsif favorite_a.present? && favorite_b.blank?
      favorite_a.update(favorite: true)
      @message = Message.find(param_message_id)
      favo_counts = Favorite.where(message_id: param_message_id, favorite: true).count
      @message.update(favocounts: favo_counts)

      @favorite = Favorite.where(user_id: current_user.id, message_id: param_message_id)
      respond_to do |format|
        format.json
      end
      
    elsif favorite_a.present? && favorite_b.present?
      favorite_a.update(favorite: false)
      @message = Message.find(param_message_id)
      favo_counts = Favorite.where(message_id: param_message_id, favorite: true).count
      @message.update(favocounts: favo_counts)

      @favorite = Favorite.where(user_id: current_user.id, message_id: param_message_id)
      respond_to do |format|
        format.json
      end
    else
      redirect_to root_path
    end
  end

  # 自動更新機能
  def index
    array = params[:favorites]
    cnt = 0

    while(cnt < params[:total].to_i) do
      p_id = array[2*cnt].to_i
      p_favocounts = array[2*cnt+1].to_i
      message = Message.find(p_id)
      if p_favocounts != message.favocounts
        message.update(checkmark: false)
      end
      cnt = cnt + 1
    end
    
    @messages = Message.where(checkmark: false)
    
    respond_to do |format|
      format.json
    end
    
  end

  # リセット処理
  def reset_check_mark
    Message.where(checkmark: false).update(checkmark: true)
  end

end
