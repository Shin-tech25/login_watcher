class MarksController < ApplicationController
  def create
    array = params[:marks]
    cnt = 0
    result = 1
    while(cnt < params[:total].to_i) do
      finder = Mark.where(user_id: current_user.id, message_id: array[2*cnt].to_i)

      if finder.blank? && array[2*cnt+1] == 'true'
        Mark.create(mark: array[2*cnt+1], user_id: current_user.id, message_id: array[2*cnt].to_i)
        flags = Mark.where(message_id: array[2*cnt]).where(mark: true).count
        @message = Message.where(id: array[2*cnt]).update(markcounts: flags)
        result = result * 0
      end
      cnt = cnt+1
    end

    # return

    if result == 0
      @messages = Message.all
      respond_to do |format|
        format.json
      end
    end


  end
end
