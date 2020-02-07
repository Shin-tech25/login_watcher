$(function(){
  $(function(){
    setInterval(reloadMessages, 7000);
    setInterval(reloadUsers, 7000);
  });

  var reloadMessages = function(){
    last_message_id = $('.wrapper__right__messages__message:last').data("message-id");
    
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: { id: last_message_id }
    })

    .done(function(messages){
      // console.log(messages);
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

  $('.wrapper__right__form__box').on("submit", function(e){
    e.preventDefault();

    var formData = new FormData(this);
    var url = $(this).attr('action');
    
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
  
    .done(function(data){

      var html = buildHTML(data);
      $('.wrapper__right__messages').append(html);
      $('form')[0].reset();
      $('.wrapper__right__messages').animate({ scrollTop: $('.wrapper__right__messages')[0].scrollHeight });
    })

    .fail(function(){
      alert('通信エラー');
    })

    .always(function(){
      $('.wrapper__right__form__box__submit-btn').prop('disabled', false);
    })
  });


  function buildHTML(message){
    if ( message.image.url ) {
      // console.log(message);
      var html =
        `<div class="wrapper__right__messages__message" data-message-id = ${message.id}>
          <div class="wrapper__right__messages__message__upper-info">
            <div class="wrapper__right__messages__message__upper-info__user">
              ${message.username}
            </div>
            <div class="wrapper__right__messages__message__created-at">
              ${message.created_at}
            </div>
          </div>
          <div class="wrapper__right__messages__message__content">
            <p class="wrapper__right__messages__message__content__text">  
              ${message.content}
            </p>
            <img src = "${message.image.url}" width="400px" class="wrapper__right__messages__message__content__img">
          </div>
        </div>`
      
      return html;
    } else {
      var html =
        `<div class="wrapper__right__messages__message" data-message-id = ${message.id}>
          <div class="wrapper__right__messages__message__upper-info">
            <div class="wrapper__right__messages__message__upper-info__user">
              ${message.username}
            </div>
            <div class="wrapper__right__messages__message__created-at">
              ${message.created_at}
            </div>
          </div>
          <div class="wrapper__right__messages__message__content">
            <p>  
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }

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
            console.log(users[num].userimage.url);
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
            // var tmp = users[num].userimage.url;
            console.log(users[num].userimage.url);
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
  }

});
