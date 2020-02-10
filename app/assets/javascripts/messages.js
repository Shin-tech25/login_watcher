var reloadMessages = function(){
  last_message_id = $('.wrapper__right__messages__message:last').data("message-id");
  
  $.ajax({
    url: "api/messages",
    type: 'get',
    dataType: 'json',
    data: {id: last_message_id}
  })
  .done(function(messages){
    if(messages.length !== 0){
      var insertHTML = '';
      $.each(messages, function(i, message) {
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
  
  var userimage_url = '';
  if(message.userimage.url != null){
    userimage_url = message.userimage.url;
  } else {
    userimage_url = '/assets/user.png';
  }

  // メッセージに画像が存在している場合
  if ( message.image.url != null ) {
    var html =
     `<div class="wrapper__right__messages__message ${message.id}" data-message-id = ${message.id}>
        <img src = "${userimage_url}", class="wrapper__right__messages__message__userimage">
        <div class="wrapper__right__messages__message__main">
          <div class="wrapper__right__messages__message__main__upper-info">
            <div class="wrapper__right__messages__message__main__upper-info__user">
              ${message.username}
            </div>
            <div style = "width: 55%;" class="wrapper__right__messages__message__main__created-at">
              ${message.created_at}
            </div>
          </div>
          <div class="wrapper__right__messages__message__main__content">
            <p class="wrapper__right__messages__message__main__content__text">  
              ${message.content}
            </p>
            <img src = "${message.image.url}" width="400px" class="wrapper__right__messages__message__main__content__img">
          </div>
          <div data-favocounts="${message.favocounts}" class="wrapper__right__messages__message__main__upper-info__favorites">
            <i style = "line-height: 24px;" data-clicked = "0" class="fa fa-thumbs-up wrapper__right__messages__message__main__upper-info__favorites__btn">
            </i>
            <div style = "margin-right: 110px;" class="wrapper__right__messages__message__main__upper-info__favorites__cnt">
              ${message.favocounts}
            </div>
          </div>
        </div>
        <div class="wrapper__right__messages__message__marks"  data-markcounts = ${message.markcounts}>
          <p class="wrapper__right__messages__message__marks__box">
          </p>
        </div>
      </div>`
    
    return html;
  } else {
    var html =
     `<div class="wrapper__right__messages__message ${message.id}" data-message-id = ${message.id}>
        <img src = "${userimage_url}", class="wrapper__right__messages__message__userimage">
        <div class="wrapper__right__messages__message__main">  
          <div class="wrapper__right__messages__message__main__upper-info">
            <div class="wrapper__right__messages__message__main__upper-info__user">
              ${message.username}
            </div>
            <div style = "width: 55%;" class="wrapper__right__messages__message__main__created-at">
              ${message.created_at}
            </div>
            <div data-favocounts="${message.favocounts}" class="wrapper__right__messages__message__main__upper-info__favorites">
              <i style = "line-height: 24px;" data-clicked = "0" class="fa fa-thumbs-up wrapper__right__messages__message__main__upper-info__favorites__btn">
              </i>
              <div style = "margin-right: 110px;" class="wrapper__right__messages__message__main__upper-info__favorites__cnt">
                ${message.favocounts}
              </div>
            </div>
          </div>
          <div class="wrapper__right__messages__message__main__content">
            <p class="wrapper__right__messages__message__main__content__text">  
              ${message.content}
            </p>
          </div>
        </div>
        <div class="wrapper__right__messages__message__marks" data-markcounts = ${message.markcounts}>
          <p class="wrapper__right__messages__message__marks__box">
          </p>
        </div>
      </div>`
    return html;
  };
};

var buildHTML2 = function(message){
  // set userimage
  
  var userimage_url = '';
  if(message.userimage.url != null){
    userimage_url = message.userimage.url;
  } else {
    userimage_url = '/assets/user.png';
  }

  // メッセージに画像が存在している場合

  var result = -1;
  if(message.image.url != null){
    if(message.markcounts > 1) result = 1;  //画像つきメッセージで既読がある
    else result = 2;  //画像つきメッセージで既読がない
  }
  else{
    if(message.markcounts > 1) result = 3;  //画像がないメッセージで既読がある
    else result = 4;  //画像がないメッセージで既読がない
  }

  if ( result == 1 ) {
    var html =
     `<img src = "${userimage_url}", class="wrapper__right__messages__message__userimage">
      <div class="wrapper__right__messages__message__main">
        <div class="wrapper__right__messages__message__main__upper-info">
          <div class="wrapper__right__messages__message__main__upper-info__user">
            ${message.username}
          </div>
          <div style = "width: 55%;" class="wrapper__right__messages__message__main__created-at">
            ${message.created_at}
          </div>
        </div>
        <div class="wrapper__right__messages__message__main__content">
          <p class="wrapper__right__messages__message__main__content__text">  
            ${message.content}
          </p>
          <img src = "${message.image.url}" width="400px" class="wrapper__right__messages__message__main__content__img">
        </div>
        <div data-favocounts="${message.favocounts}" class="wrapper__right__messages__message__main__upper-info__favorites">
          <i style = "line-height: 24px;" data-clicked = "0" class="fa fa-thumbs-up wrapper__right__messages__message__main__upper-info__favorites__btn">
          </i>
          <div style = "margin-right: 110px;" class="wrapper__right__messages__message__main__upper-info__favorites__cnt">
            ${message.favocounts}
          </div>
        </div>
      </div>
      <div class="wrapper__right__messages__message__marks"  data-markcounts = ${message.markcounts}>
        <p class="wrapper__right__messages__message__marks__box">
          既読 ${message.markcounts - 1}
        </p>
      </div>`
    return html;
  }
  else if(result == 2){
    var html =
     `<img src = "${userimage_url}", class="wrapper__right__messages__message__userimage">
      <div class="wrapper__right__messages__message__main">
        <div class="wrapper__right__messages__message__main__upper-info">
          <div class="wrapper__right__messages__message__main__upper-info__user">
            ${message.username}
          </div>
          <div style = "width: 55%;" class="wrapper__right__messages__message__main__created-at">
            ${message.created_at}
          </div>
        </div>
        <div class="wrapper__right__messages__message__main__content">
          <p class="wrapper__right__messages__message__main__content__text">  
            ${message.content}
          </p>
          <img src = "${message.image.url}" width="400px" class="wrapper__right__messages__message__main__content__img">
        </div>
        <div data-favocounts="${message.favocounts}" class="wrapper__right__messages__message__main__upper-info__favorites">
          <i style = "line-height: 24px;" data-clicked = "0" class="fa fa-thumbs-up wrapper__right__messages__message__main__upper-info__favorites__btn">
          </i>
          <div style = "margin-right: 110px;" class="wrapper__right__messages__message__main__upper-info__favorites__cnt">
            ${message.favocounts}
          </div>
        </div>
      </div>
      <div class="wrapper__right__messages__message__marks"  data-markcounts = ${message.markcounts}>
        <p class="wrapper__right__messages__message__marks__box">
        </p>
      </div>`
    return html;
  }
  else if(result == 3){
    var html =
     `<img src = "${userimage_url}", class="wrapper__right__messages__message__userimage">
      <div class="wrapper__right__messages__message__main">  
        <div class="wrapper__right__messages__message__main__upper-info">
          <div class="wrapper__right__messages__message__main__upper-info__user">
            ${message.username}
          </div>
          <div style = "width: 55%;" class="wrapper__right__messages__message__main__created-at">
            ${message.created_at}
          </div>
          <div data-favocounts="${message.favocounts}" class="wrapper__right__messages__message__main__upper-info__favorites">
            <i style = "line-height: 24px;" data-clicked = "0" class="fa fa-thumbs-up wrapper__right__messages__message__main__upper-info__favorites__btn">
            </i>
            <div style = "margin-right: 110px;" class="wrapper__right__messages__message__main__upper-info__favorites__cnt">
              ${message.favocounts}
            </div>
          </div>
        </div>
        <div class="wrapper__right__messages__message__main__content">
          <p class="wrapper__right__messages__message__main__content__text">  
            ${message.content}
          </p>
        </div>
      </div>
      <div class="wrapper__right__messages__message__marks" data-markcounts = ${message.markcounts}>
        <p class="wrapper__right__messages__message__marks__box">
          既読 ${message.markcounts - 1}
        </p>
      </div>`
    return html
  }
  else if(result == 4){
    var html =
     `<img src = "${userimage_url}", class="wrapper__right__messages__message__userimage">
      <div class="wrapper__right__messages__message__main">  
        <div class="wrapper__right__messages__message__main__upper-info">
          <div class="wrapper__right__messages__message__main__upper-info__user">
            ${message.username}
          </div>
          <div style = "width: 55%;" class="wrapper__right__messages__message__main__created-at">
            ${message.created_at}
          </div>
          <div data-favocounts="${message.favocounts}" class="wrapper__right__messages__message__main__upper-info__favorites">
            <i style = "line-height: 24px;" data-clicked = "0" class="fa fa-thumbs-up wrapper__right__messages__message__main__upper-info__favorites__btn">
            </i>
            <div style = "margin-right: 110px;" class="wrapper__right__messages__message__main__upper-info__favorites__cnt">
              ${message.favocounts}
            </div>
          </div>
        </div>
        <div class="wrapper__right__messages__message__main__content">
          <p class="wrapper__right__messages__message__main__content__text">  
            ${message.content}
          </p>
        </div>
      </div>
      <div class="wrapper__right__messages__message__marks" data-markcounts = ${message.markcounts}>
        <p class="wrapper__right__messages__message__marks__box">
        </p>
      </div>`
    return html
  }
  else{
    var html = '';
    return html;
  }
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
  // 既読に変更があれば、そのメッセージだけを変更をかけるような処理を加える。
  // Ajaxに渡すパラメーターは、message_id, markcounts
  // Ajaxから受け取るパラメーターは変更があるmessage_id, markcounts

  // 最初に$('.wrapper__right__messages')でhtml要素を取得する。
  
  var html = $('.wrapper__right__messages');
  // 次に、message-id及びそれに対応するmarkcountsを配列にして渡す。
  // 配列の作成
  var obj = $('.wrapper__right__messages__message');
  var messages_total = obj.length;
  var sendMarksArray = new Array(2 * messages_total);
  var obj_mark;

  for(var i=0; i<messages_total; i++){
    sendMarksArray[2*i] = obj[i].dataset.messageId;  //data-message-idの取得
    obj_mark = obj[i].children;
    sendMarksArray[2*i+1] = obj_mark[2].dataset.markcounts;
  }

  // Ajaxで作成した配列を渡す
  $.ajax({
    url: '/marks',
    type: 'get',
    dataType: 'json',
    data: {marks: sendMarksArray, total: messages_total}
  })
  .done(function( messages ){
    if(messages.length !== 0){
      var insertHTML = '';
      $.each(messages, function(i, message) {
        target = $(`.${message.id}`);
        old_child = target.children()[2];
        var mark_counts = message.markcounts - 1;
        if(mark_counts > 0){
          new_child =
            `<div class="wrapper__right__messages__message__marks" data-markcounts = ${message.markcounts}>
              <p class="wrapper__right__messages__message__marks__box">
                既読 ${message.markcounts - 1}
              </p>
            </div>`
        } else {
          new_child =
            `<div class="wrapper__right__messages__message__marks" data-markcounts = ${message.markcounts}>
              <p class="wrapper__right__messages__message__marks__box">
              </p>
            </div>`
        }
        old_child.remove();
        target.append(new_child);
      });
    }
  })
  .fail(function( ){
    console.log('error');
  });
  
};

var checkMarks = function(){

  var total = $('.wrapper__right__messages__message').length; //message total
  var sendMarkedArray = new Array(length * 2);
  var obj = $('.wrapper__right__messages__message');

  for(var i=0; i<total; i++){
    var id = obj[i].dataset.messageId;
    var tmp = '.' + id;
    tmp = tmp.toString();
    var target = $(tmp);
    
    var p = $('.wrapper__right__messages').height() - target.offset().top;
    if(p>0){
      sendMarkedArray[2*i] = id;
      sendMarkedArray[2*i+1] = true;
    } else {
      sendMarkedArray[2*i] = id;
      sendMarkedArray[2*i+1] = false;
    }
  }
  $.ajax({
    type: 'POST',
    url: '/marks',
    dataType: 'json',
    data: { marks: sendMarkedArray, total: total}
  })
  .done(function(messages){
    console.log('hoge');
  })
  .fail(function(){
    console.log("error")
  });
};

var clickFavorite = function(toggle_favo_parent, favo_cnt, data_clicked){
  var new_child0, new_child1;
  // クリックされていない時の処理
  if(data_clicked == 0){
    new_child0 =
      `<i style = "color: red; line-height: 24px;" data-clicked="1" class="fa fa-thumbs-up wrapper__right__messages__message__main__upper-info__favorites__btn--clicked"></i>`
    new_child1 =
      `<div style = "color: red; margin-right: 110px;" class="wrapper__right__messages__message__main__upper-info__favorites__cnt--clicked">
        ${favo_cnt}
      </div>`
  // クリックされている時の処理 
  } else {  
    new_child0 =
    `<i style = "line-height: 24px;" data-clicked = "0" class="fa fa-thumbs-up wrapper__right__messages__message__main__upper-info__favorites__btn">
    </i>`
    if (favo_cnt > 0){
      new_child1 =
      `<div style = "margin-right: 110px;" class="wrapper__right__messages__message__main__upper-info__favorites__cnt">
        ${favo_cnt}
      </div>`
    } else {
      new_child1 =
      `<div style = "margin-right: 110px;" class="wrapper__right__messages__message__main__upper-info__favorites__cnt">
      </div>`
    }
  }

  var result = new_child0 + new_child1;

  toggle_favo_parent.data('favocounts', favo_cnt);
  toggle_favo_parent.empty();
  toggle_favo_parent.append(result);
};

var reloadFavorites = function(){
  // Ajaxで送るパラメーターの取得
  
  //  => parameters: {message_id, favocounts}
  var message_id = $('.wrapper__right__messages__message');
  var messages_total = $('.wrapper__right__messages__message').length;
  var send_data = new Array(2 * messages_total);
  var favocounts = $('.wrapper__right__messages__message__main__upper-info__favorites');
  var j = 0;
  for(var i=0; i<messages_total; i++){
    send_data[2*i] = message_id[i].dataset.messageId;
    send_data[2*i+1] = favocounts[i].dataset.favocounts;
  }
  // 

  // Ajax
  $.ajax({
    url: '/favorites',
    type: 'get',
    dataType: 'json',
    data: {favorites: send_data, total: messages_total}
  })
  .done(function(messages){
    if(messages.length !== 0){
      var insertHTML = '';
      $.each(messages, function(i, message) {
        target = $(`.${message.id}`);
        target.empty();

        target.append(buildHTML2(message));
      });
    }
  })
  .fail(function(){
    console.log('error');
  });
};