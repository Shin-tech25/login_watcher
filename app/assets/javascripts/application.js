// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require activestorage

//= require jquery
//= require jquery_ujs
//= require_tree .

$(function(){

  // autoupdate function listener
  if(document.location.href.match('localhost:3000/$')){
    setInterval(reloadUsers, 7000);
    setInterval(reloadMessages, 7000);
    setInterval(reloadMarks, 5000);
    setInterval(checkMarks, 2000);
  }
  
  // event listener
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

  $('.wrapper__right__messages__message__main__upper-info__favorites').on("click", function(e){
    var favo_box = $(this)
    console.log(favo_box);
    // get message-id
    var message_id = favo_box.parents()[2].dataset.messageId;
    console.log('=> parameters: { message_id: ', message_id, '}');

    // get data_clicked
    var data_clicked = favo_box.children()[0].dataset.clicked;
    // console.log(data_clicked);
    
    // icon クリックでAjax通信開始 -> 通信が成功したら、帰ってきた値に応じてCSSでthumbs-upのボタンの色を変更する。
    $.ajax({
      url: '/favorites',
      type: 'post',
      dataType: 'json',
      data: {message_id: message_id}
    })
    .done(function(message){
      console.log('<= ', message);
      
      clickFavorite(favo_box, message.favocounts, data_clicked);

    })
    .fail(function(){
      console.log('Ajax connected error.');
    
    });

  });

});