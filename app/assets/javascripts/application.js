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
  setInterval(reloadUsers, 7000);
  setInterval(reloadMessages, 7000);
  setInterval(reloadMarks, 2000);

  
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
  
  $('.wrapper__right__messages').on("scroll", function(e){
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
  })


});