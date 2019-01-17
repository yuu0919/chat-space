$(function(){

  var search_list = $('#user-search-result')
  var add_member = $('#chat-group-users')



  function appendSearch_list(user) {
    var list = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    search_list.append(list);
  }

  function appendAdd_member(id, name) {
    var member = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                    <input name='group[user_ids][]' type='hidden' value='${id}'>
                    <p class='chat-group-user__name'>${name}</p>
                    <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                  </div>`
    add_member.append(member);
  }

  function appendNoUser(user) {
    var message = `<div class="chat-group-user clearfix">
                    <p>${user}</p>
                  </div>`
    search_list.append(message);
  }
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
    return html;
  };

  $('#user-search-field').on('keyup',function(){
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: {keyword: input},
      dataType: 'json'
    })

    .done(function(data){
      $('#user-search-result').empty();

      if (data.length != 0) {
        data.forEach(function(user){
          appendSearch_list(user);
        });
      }
      else {
        appendNoUser("一致するユーザーがいません");
      }
    })

    .fail(function() {
      alert('ユーザーの検索に失敗しました');
    });
  });

  $('#user-search-result').on('click', ".user-search-add", function(){
      var id = $(this).attr('data-user-id')
      var name = $(this).attr('data-user-name')
    appendAdd_member(id, name);
    $(this).parent().remove();
  });
  $('#chat-group-users').on('click', ".user-search-remove", function(){
    $(this).parent().remove();
  });

  $(function(){
    $(function(){
      if (location.pathname.match(/\/groups\/\d+\/messages/)) {
        setInterval(update, 5000);
      }
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
      .done(function(data){
        $.each(data, function(i, data){
          var html = buildHTML(data);
          $('.chat-main__body').append(html);
          $('.chat-main__body').animate({scrollTop: $('.chat-main__body')[0].scrollHeight}, 'fast');
        })
      })
      .fail(function(){
        alert('通信に失敗しました');
      })
    }
  })

});
