$(document).ready(function() {

  var socket = io();
  //the players
  var setPlayers;
  //the fish
  var fish;
  //the shark
  var shark;



  //once palyers are set then seperate the fish from the shark

  /*
  @param {Array} these are the players for the game
*/

  socket.on('players-set', function(players){
    // push the players to an array to be seperated for the fish and the shark
    var playersToSort = players;


    //clone the players array to setPlayers to keep a list of all joined players
    setPlayers = _.clone(players);

    //display all current players
    displayCurrentPlayers(setPlayers, $('#set-players'));

    //seperate the array players to sort into fish and shark arrays
    sortPlayers(playersToSort);

    //show all the players that are fish
    displayCurrentPlayers(fish, $('#fish'));

    //display who is the shark
    $('#shark').text(shark[0].name + ' id: ' + shark[0].id);

    console.log(player.id);

  });




  //sort the players
  function sortPlayers(p) {
    //get a random index from players Array
    var randomIndex = Math.floor( Math.random() * p.length );
    //remove the random Player from the array. this will be the shark
    shark = p.splice(p.randomIndex, 1);
    //fish will be the remaining players
    fish = p;


  };


  function displayCurrentPlayers(p, list) {
    // clear the players list
    $(list).html('');
    //print all the players names and id's
    $.each(p, function(index, el) {
      $('<li>').text('name:' + el.name + ' id:' + el.id).appendTo(list);
    });
  }


});
