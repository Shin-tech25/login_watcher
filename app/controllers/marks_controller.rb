class MarksController < ApplicationController
  after_action :reset_check_mark, only: [:index]

  def create
    array = params[:marks]
    cnt = 0
    result = 1
    while(cnt < params[:total].to_i) do
      finder = Mark.where(user_id: current_user.id, message_id: array[2*cnt].to_i)
      if finder.blank? && array[2*cnt+1] == 'true'
        Mark.create(mark: array[2*cnt+1], user_id: current_user.id, message_id: array[2*cnt].to_i)
        flags = Mark.where(message_id: array[2*cnt].to_i).where(mark: true).count
        @message = Message.where(id: array[2*cnt].to_i).update(markcounts: flags)
        
        result = result * 0
      end
      cnt = cnt+1
    end
  end

  # argument params[:marks]
  # return @messages(that is changed compared with DB)
  def index
    array = params[:marks]

    cnt = 0

    while(cnt < params[:total].to_i) do
      p_id = array[2*cnt].to_i
      p_marks = array[2*cnt+1].to_i
      message = Message.find_by(id: p_id)
      if p_marks != message.markcounts
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
