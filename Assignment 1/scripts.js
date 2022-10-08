//Assignment 2 Code
function test_print(){

         console.log(“test code”)
}

$(function () {
  //Get Users
  $('#get-tweets-button').on('click', function () {
    //TODO: get all users' IDs & display it
    $.ajax({
      url: '/tweets',
      contentType: 'application/json',
      success: function (searchinfo) {
        console.log(searchinfo);
        var tbodyEl = $(tweetbody);

        tbodyEl.html('');

        //Displays the User ID, Tweet, and Created at
        searchinfo.tweetinfo.forEach(function (tweetinfo) {
          tbodyEl.append('\
                      <tr>\
                      <td class="User_id">' + tweetinfo.user.id + '</td>\
                      <td class="Tweet">' + tweetinfo.text + '</td>\
                      <td class="Created_at">' + tweetinfo.created_at + '</td>\
                      </tr>\
                  ');
        });
      }
    });
  });


  //Get tweets
  $('#get-button').on('click', function () {
    //TODO: get tweet info and display it
    $.ajax({
      url: '/tweetinfo',
      contentType: 'application/json',
      success: function (searchinfo) {
        console.log(searchinfo);
        var tbodyEl = $(namebody);

        tbodyEl.html('');
        //Displays the User ID, Screen Name, and User name
        searchinfo.tweetinfo.forEach(function (tweetinfo) {
          tbodyEl.append('\
                      <tr>\
                          <td class="User_id">' + tweetinfo.user.id + '</td>\
                          <td class="Screen_Name">' + tweetinfo.user.screen_name + '</td>\
                          <td class="User_Name">' + tweetinfo.user.name + '</td>\
                      </tr>\
                  ');
        });
      }
    });
  });

  //Get searched tweets
  $('#get-searched-tweets').on('click', function () {
    //TODO: get a searched tweet(s) & display it
    console.log('Got Searched Tweet');
    $.ajax({
      url: '/searchinfo',
      contentType: 'application/json',
      success: function (searchinfo) {
        console.log(searchinfo);
        var tbodyEl = $(searchbody);

        tbodyEl.html('');
        //Displays the User ID, Screen Name, and User name
        searchinfo.tweetinfo.forEach(function (tweetinfo) { 
          tbodyEl.append('\
                      <tr>\
                          <td class="User_id">' + tweetinfo.user.id + '</td>\
                          <td class="User_text">' + tweetinfo.text + '</td>\
                          <td class="Created_at">' + tweetinfo.user.created_at + '</td>\
                      </tr>\
                  ');
        });
      }
    });
  });


  //CREATE
  $('#create-form').on('submit', function (event) {
    event.preventDefault();

    var createInput = $('#create-input');

    //TODO: create a tweet
    $.ajax({
      url: '/tweetinfo',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(({ text: createInput.val() })),
      success: function (searchinfo) {
        console.log(searchinfo);
        createInput.val('');
        $('#create-input').click();
      }
    });
  });

  //Create searched tweets
  $('#search-form').on('submit', function (event) {
    event.preventDefault();
    var userID = $('#search-input');

    //TODO: search a tweet and display it.
    $.ajax({
      url: '/searchinfo',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(({ number: userID.val() })),
      success: function (searchinfo) {
        console.log(searchinfo);
        userID.val('');
        $('#search-input').click();

      }
    });
  });

  //UPDATE/PUT
  $("#update-user").on('submit', function (event) {
    event.preventDefault();
    var updateInput = $('#update-input');
    var inputString = updateInput.val();
    const parsedStrings = inputString.split(';');

    var name = parsedStrings[0];
    var newName = parsedStrings[1];

    console.log(name);
    //TODO: update a user name 
    $.ajax({
      url: '/tweets/' + name,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(({ newName:newName })),
      success: function (searchinfo) {
        console.log(searchinfo);
        $('#update-input').click();
      }
    });
  });


  //DELETE
  $("#delete-form").on('submit', function (event) {
    event.preventDefault();
    var id = $('#delete-input');
    var tweetid = id.val();
    console.log(tweetid + '   '+ id);
    

    //TODO: delete a tweet
    $.ajax({
      url: '/tweetinfo/'+ tweetid,
      method: 'DELETE',
      contentType: 'application/json',
      data: JSON.stringify(({ tweetid:tweetid})),
      success: function (searchinfo) {
        console.log(searchinfo);
        $('#delete-input').click();
      }
    });
  });
});



