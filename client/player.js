//initialize socket
var socket = io();


//store player name that is given through input
var playerInputName = $('#username');

// create a player object
var player = {};

var allPlayers;




//when join button is clicked players info is added to game
$('#join-btn').on('click', function(event) {
  event.preventDefault();

  console.log(playerInputName.length);

  if(playerInputName.val()){

  // // store the player name in player object
  player.name = playerInputName.val();

  //store a unique socket id for player
  player.id = socket.id;

  //player type is equal to fish
  player.type = 'fish';


  console.log(player);

  //send player object to server
  socket.emit('new-player', player);

  //call the next screen that shows the players
  loadPregame();

}

});


//ajax call for second screen 

function loadPregame(){
  $.ajax({
    url: 'template/pregame.html'
  })
  .done(function(response) {
    console.log("success");
    if ($("#main").html() != response) {
    $("#content").fadeOut(200, function() {
      $("#main").html(response);
      $('.countdown').fadeIn();
      var a = allPlayers;
      displayCurrentPlayers(a);
    });
  }
})
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
};



socket.on('players', function(msg){
  allPlayers = _.clone(msg);
  displayCurrentPlayers(msg);
});


// //show all current players logged in
function displayCurrentPlayers(players) {
  // clear the players list
  $('#players-list').html('');

  //print all the players names and id's
  $.each(players, function(index, el) {

    //list out all players to players list screen
    $('<li>').text( el.name ).appendTo($('#players-list')).addClass('players-list__item');

  });
}
