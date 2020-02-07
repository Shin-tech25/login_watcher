$(function(){
  console.log('users.js loaded.');
  // $(function(){
  //   setInterval(reloadUsers, 7000);
  // });

  // var reloadUsers = function(){
  //   console.log('reloadUsers called.');
  //   attend_cnt = $('.wrapper__left__users__attend__card').length;
  //   users_cnt = attend_cnt + $('.wrapper__left__users__absent__card').length;
  //   // Ajax通信
  //   $.ajax({
  //     type: 'GET',
  //     url: '/users',
  //     dataType: 'json',
  //     data: { attend: attend_cnt, users: users_cnt}
  //   })
  //   .done(function(users){
  //     if(users.length !== 0){
  //       var attend_card_html = '';
  //       var absent_card_html = '';
  //       $.each(users, function(user){
  //         attributesHTML(user, attend_card_html, absent_card_html);
  //       });
  //       $('.wrapper__left__users__attend').append(attend_card_html);
  //       $('.wrapper__left__users__absent').append(absent_card_html);
  //     }
  //   })
  //   .fail(function(){
  //     console.log('error');
  //   });
  // }
  
  // function attributesHTML(user, buildhtml1, buildhtml2){
  //   console.log('hello!');
  //   if(user.status){
  //     console.log('user: true');
  //     buildhtml1 += 
  //       `<div class="wrapper__left__users__attend__card"> 
  //         <image src="user.png", alt="user", height="130px", width="130px", class="wrapper__left__users__attend__card__img">
  //         <p class="wrapper__left__users__attend__card__name">
  //           ${user.attend_username}
  //         </p>
  //       </div>`
  //   } else {
  //     buildhtml2 += 
  //       `<div class="wrapper__left__users__absent__card"> 
  //       <image src="user.png", alt="user", height="100px", width="100px", class="wrapper__left__users__absent__card__img">
  //       <p class="wrapper__left__users__absent__card__name">
  //         ${user.absent_username}
  //       </p>
  //       </div>`
  //   }
  // }
});