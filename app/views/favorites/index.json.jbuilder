json.array! @messages do |message|
  json.markcounts message.markcounts
  json.username message.user.username
  json.created_at message.created_at.strftime("%Y年%m月%d日 %H時%M分")
  json.content message.content
  json.image message.image
  json.id message.id
  json.markcounts message.markcounts
  json.userimage message.user.userimage
  json.favocounts message.favocounts
end