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