json.array! @users do |user|
  json.username  user.username
  json.status  user.status
  json.userimage  user.userimage
end