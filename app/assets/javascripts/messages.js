var reloadMessages = function(){
  last_message_id = $('.wrapper__right__messages__message:last').data("message-id");
  
  $.ajax({
    url: "api/messages",
    type: 'get',
    dataType: 'json',
    data: { id: last_message_id }
  })

  .done(function(messages){
    if(messages.length !== 0){
      var insertHTML = '';
      $.each(messages, function(message) {
        insertHTML += buildHTML(message)
      });
      $('.wrapper__right__messages').append(insertHTML);
      $('.wrapper__right__messages').animate({ scrollTop: $('.wrapper__right__messages')[0].scrollHeight });
    }
  })

  .fail(function(){
    console.log('error');
  });
};

var buildHTML = function(message){
  // set userimage
  var userimage_url = '';
  if(message.userimage) userimage_url = message.userimage.url;
  else userimage_url = '/assets/user.png';
  // 

  if ( message.image.url ) {
    var html =
     `<div class="wrapper__right__messages__message" data-message-id = ${message.id}>
        <img src = "${userimage_url}", class="wrapper__right__messages__message__userimage">
        <div class="wrapper__right__messages__message__main">
          <div class="wrapper__right__messages__message__main__upper-info">
            <div class="wrapper__right__messages__message__main__upper-info__user">
              ${message.username}
            </div>
            <div class="wrapper__right__messages__message__main__created-at">
              ${message.created_at}
            </div>
          </div>
          <div class="wrapper__right__messages__message__main__content">
            <p class="wrapper__right__messages__message__main__content__text">  
              ${message.content}
            </p>
            <img src = "${message.image.url}" width="400px" class="wrapper__right__messages__message__main__content__img">
          </div>
        </div>
        <div class="wrapper__right__messages__message__marks">
          <p class="wrapper__right__messages__message__marks__box">
            既読 ${message.markcounts}
          </p>
        </div>
      </div>`
    
    return html;
  } else {
    var html =
     `<div class="wrapper__right__messages__message" data-message-id = ${message.id}>
        <img src = "${userimage_url}", class="wrapper__right__messages__message__userimage">
        <div class="wrapper__right__messages__message__main">  
          <div class="wrapper__right__messages__message__main__upper-info">
            <div class="wrapper__right__messages__message__main__upper-info__user">
              ${message.username}
            </div>
            <div class="wrapper__right__messages__message__main__created-at">
              ${message.created_at}
            </div>
          </div>
          <div class="wrapper__right__messages__message__main__content">
            <p>  
              ${message.content}
            </p>
          </div>
        </div>
        <div class="wrapper__right__messages__message__marks">
          <p class="wrapper__right__messages__message__marks__box">
            既読 ${message.markcounts}
          </p>
        </div>
      </div>`
    return html;
  };
};

var reloadUsers = function(){
  attend_cnt = $('.wrapper__left__users__attend__card').length;
  users_cnt = attend_cnt + $('.wrapper__left__users__absent__card').length;

  $.ajax({
    type: 'GET',
    url: '/users',
    dataType: 'json',
    data: { attend: attend_cnt, users: users_cnt}
  })
  .done(function(users){

    if(users.length !== 0){

      var attend_card_html = '';
      var absent_card_html = '';
      $.each(users, function(num){

        if(users[num].status==true){
          if(users[num].userimage.url==null){
            attend_card_html += 
            `<div class="wrapper__left__users__attend__card"> 
              <image src="/assets/user.png", alt="user", class="wrapper__left__users__attend__card__img">
              <p class="wrapper__left__users__attend__card__name">
                ${users[num].username}
              </p>
            </div>`

          }else{
            attend_card_html += 
            `<div class="wrapper__left__users__attend__card"> 
              <image src="${users[num].userimage.url}", alt="user", class="wrapper__left__users__attend__card__img">
              <p class="wrapper__left__users__attend__card__name">
                ${users[num].username}
              </p>
            </div>`
          }
        }else{
          if(users[num].userimage.url==null){
            absent_card_html +=
            `<div class="wrapper__left__users__absent__card"> 
              <image src="/assets/user.png", alt="user", class="wrapper__left__users__absent__card__img">
              <p class="wrapper__left__users__absent__card__name">
                ${users[num].username}
              </p>
            </div>`

          }else{
            absent_card_html +=
            `<div class="wrapper__left__users__absent__card"> 
              <image src="${users[num].userimage.url}", alt="user", class="wrapper__left__users__absent__card__img">
              <p class="wrapper__left__users__absent__card__name">
                ${users[num].username}
              </p>
            </div>`
          }
          
        }
      });

      $('.wrapper__left__users__attend').empty();
      $('.wrapper__left__users__attend').append(attend_card_html);
      $('.wrapper__left__users__absent').empty();
      $('.wrapper__left__users__absent').append(absent_card_html);
    }
  })
  .fail(function(){
    console.log('error');
  });
};

var reloadMarks = function(){
  console.log('reloadMarks');
  // 既読に変更があれば、そのメッセージだけを変更をかけるような処理を加える。
};
