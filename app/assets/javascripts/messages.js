var reloadMessages = function(){
  last_message_id = $('.wrapper__right__messages__message:last').data("message-id");
  
  $.ajax({
    url: "api/messages",
    type: 'get',
    dataType: 'json',
    data: {id: last_message_id}
  })
  .done(function(messages){
    // console.log(messages);
    if(messages.length !== 0){
      var insertHTML = '';
      $.each(messages, function(i, message) {
        // console.log(message);
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
  if(message.userimage.url != null){
    userimage_url = message.userimage.url;
  } else {
    userimage_url = '/assets/user.png';
  }
  
  //
  // userimage_url = '/assets/user.png';

  // メッセージに画像が存在している場合

  // -- DEBUG CONSOLE
  console.log('BEGIN');
  console.log('message', message);
  console.log('message.image', message.image);
  console.log('message.userimage', message.userimage);
  console.log('message.userimage.url', message.userimage.url);
  console.log('message.userimage.url != null', message.userimage.url != null);
  console.log('message.image.url', message.image.url);
  console.log('message.image.url == null', message.image.url==null);
  console.log('userimage_url', userimage_url);
  console.log('END');
  // --
  if ( message.image.url != null ) {
    // 
    
    console.log(userimage_url);
    console.log('hoge');
    //
    var html =
     `<div class="wrapper__right__messages__message ${message.id}" data-message-id = ${message.id}>
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
        <div class="wrapper__right__messages__message__marks"  data-markcounts = ${message.markcounts}>
          <p class="wrapper__right__messages__message__marks__box">
          </p>
        </div>
      </div>`
    
    return html;
  } else {
    console.log('hogehoge');
    console.log(userimage_url);
    var html =
     `<div class="wrapper__right__messages__message ${message.id}" data-message-id = ${message.id}>
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
  // console.log('reloadMarks');
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
  // console.log(sendMarksArray);

  // Ajaxで作成した配列を渡す
  // console.log(sendMarksArray);
  // console.log(messages_total);
  $.ajax({
    url: '/marks',
    type: 'get',
    dataType: 'json',
    data: {marks: sendMarksArray, total: messages_total}
  })
  .done(function( messages ){
    // console.log('reloadmarks each messages', messages);
    if(messages.length !== 0){
      var insertHTML = '';
      $.each(messages, function(i, message) {
        // console.log('reloadmarks each message: ', message);
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
  // console.log('scroll and marks eventlistener loaded.');

  var total = $('.wrapper__right__messages__message').length; //message total
  // console.log($('.wrapper__right__messages__message'));
  // console.log('length:', total);
  var sendMarkedArray = new Array(length * 2);
  var obj = $('.wrapper__right__messages__message');

  for(var i=0; i<total; i++){
    var id = obj[i].dataset.messageId;
    var tmp = '.' + id;
    tmp = tmp.toString();
    var target = $(tmp);
    
    var p = $('.wrapper__right__messages').height() - target.offset().top;
    // console.log($('.wrapper__right__messages').height());
    // console.log(target);
    // console.log(target.offset());
    // console.log(target.offset().top)
    // console.log(p);
    if(p>0){
      // console.log(id, 'true');
      sendMarkedArray[2*i] = id;
      sendMarkedArray[2*i+1] = true;
    } else {
      // console.log(id, 'false');
      sendMarkedArray[2*i] = id;
      sendMarkedArray[2*i+1] = false;
    }
  }
  // console.log(sendMarkedArray);
  // console.log(total);
  $.ajax({
    type: 'POST',
    url: '/marks',
    dataType: 'json',
    data: { marks: sendMarkedArray, total: total}
  })
  .done(function(messages){
    // console.log(messages);
    // console.log("Ajax connected successfully.");
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

  toggle_favo_parent.empty();
  toggle_favo_parent.append(result);
};

// var clickFavorite = function(toggle_favo_parent, favo_cnt, flag){
//   var new_child0, new_child1;
//   // クリックされていない時の処理
//   if(!flag){
//     new_child0 = toggle_favo_parent.children()[0];
//     new_child0.addClass("wrapper__right__messages__message__main__upper-info__favorites__btn--clicked");
//     new_child1 = toggle_favl_parent.children()[1];
    
//     // new_child0 =
//     //   `<i class="fa fa-thumbs-up wrapper__right__messages__message__main__upper-info__favorites__btn wrapper__right__messages__message__main__upper-info__favorites__btn--clicked">
//     //   </i>`
//     // new_child1 =
//     //   `<div class="wrapper__right__messages__message__main__upper-info__favorites__cnt wrapper__right__messages__message__main__upper-info__favorites__cnt--clicked">
//     //     ${favo_cnt}
//     //   </div>`
//   // クリックされている時の処理 
//   } else {  
//     new_child0 =
//     `<i class="fa fa-thumbs-up wrapper__right__messages__message__main__upper-info__favorites__btn">
//     </i>`
//     new_child1 =
//     `<div class="wrapper__right__messages__message__main__upper-info__favorites__cnt">
//       ${favo_cnt}
//     </div>`
//   }

//   var result = new_child0 + new_child1;

//   toggle_favo_parent.empty();
//   toggle_favo_parent.append(result);
// };