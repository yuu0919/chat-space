$(function(){

  function buildHTML(message){

  var body = `<div class="chat-main__body--message-list" data-id="${message.id}">
              <div class="chat-main__message clearfix">
                <div class="chat-main__message-name">
                   ${message.user_name}
                 </div>
                 <div class="chat-main__message-time">
                   ${message.created_at}
                 </div>
                 <div class="chat-main__message-body">
                   <p class="lower-message__content">
                     ${message.body}
                   </p>`

    if (message.image) {
      var html = `${body}
                    <img class="lower-message__image" src=${message.image}>
                    </div>
                  </div>`
    } else {
      var html = `${body}
                    </div>
                  </div>`
    }
    $('.chat-main__body').append(html);
  }

  $("#form").on('submit', function(e){
    e.preventDefault();
    var formData = new FormData($(this).get()[0]);
    var href = window.location.href;
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      buildHTML(data);
      $('#form')[0].reset();
      $('.chat-main__body').animate({scrollTop: $('.chat-main__body')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $('#form__submit').removeAttr('disabled');
    });

  });

  $(function(){
      setInterval(update, 5000);
    });
  function update(){
    if($('.chat-main__body--message-list')[0]){
      var message_id = $('.chat-main__body--message-list:last').data('id');
    } else {
      var message_id = 0
    }
    $.ajax({
      url: location.href,
      type: 'GET',
      data: {
        message: {id: message_id}
      },
      dataType: 'json'
    })
    .always(function(data){
      console.log(data);
      $.each(data, function(i, data){
        buildHTML(data);
      });
    });
  }
});
