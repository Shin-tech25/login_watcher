class FavoritesController < ApplicationController
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
end
