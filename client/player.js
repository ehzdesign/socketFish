//initialize socket
var socket = io();

//store player name that is given through input
var playerInputName = $('#player-name');

// create a player object
var player = {};


//when join button is clicked players info is added to game
$('#join-btn').on('click', function(event) {
  event.preventDefault();



  // // store the player name in player object
  player.name = playerInputName.val();

  //store a unique socket id for player
  player.id = socket.id;

  //send player object to server
  socket.emit('new-player', player);

  //clear the register form
  $('.register-player').html('');

  $('#message').text('waiting for more players, be patient');

});



socket.on('players', function(msg){
  console.log(msg);
  displayCurrentPlayers(msg);
});



socket.on('players-set', function(msg) {
  $('#message').text('we have enough players, lets start the game!');
  //clear the register form
  $('.register-player').html('');
  //show the players currently playing
  displayCurrentPlayers(msg);
  setTimeout(redirectToGame(), 1000);

});


//show all current players logged in
function displayCurrentPlayers(players) {
  // clear the players list
  $('#players').html('');
  //print all the players names and id's
  $.each(players, function(index, el) {
    $('<li>').text('name:' + el.name + ' id:' + el.id).appendTo($('#players'));
  });
}


//redirect to game pager
function redirectToGame() {
  window.location.href = 'game.html';
}
