$(function(){
  function buildHTML(message){
    var body = `<div class="chat-main__body--message-list">
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
    return html;
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
      var html = buildHTML(data);
      $('.chat-main__body').append(html);
      $('#form')[0].reset();
      $('.chat-main__body').animate({scrollTop: $('.chat-main__body')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $('#form__submit').removeAttr('disabled');
    });
  })
});
