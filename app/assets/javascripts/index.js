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

});
