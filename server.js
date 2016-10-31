//setup basic server

var http	=	require('http');
var path	=	require('path');
var socketio =	require('socket.io');
var express	=	require('express');
var router	=	express();
var server	=	http.createServer(router);
var io =	socketio.listen(server);

const util = require('util');

//	Use	router	to	point	requests	to	the	'client'	folder
router.use(express.static(path.resolve(__dirname,	 'client')));



//store all the players that are connected
var players = [];

//set the amount of players allowed here
var playerLimit = 3;


//	Socket.io function	 that	runs	when	a	user	connects
io.on('connection',	 function	(socket)	{

  //tell server that a user connected with their id
  console.log('a	user	connected', socket.id);


  if(players.length == playerLimit) {
    // let client know we have reached max players - ready to start the game now
    io.emit('players-set', players);
    io.emit('current-player-id', socket.id);
  }else{
    // emit a message to the user telling him who is currently connected
    io.emit('players', players);
  }

  socket.on('new-player', function(msg){
      // let's push the new player to our players array
      players.push(msg);

      // let everyone know who connected players are
      io.emit('players', players);

      //if a player tries to enter after we have enough players we must let them know that the game is already started
      if(players.length === playerLimit){
        io.emit('players-set', players);
      }


  });


  socket.on('disconnect',	 function	 ()	{
    //do stuff here when a user leaves
    console.log('user	 disconnected');
  });

});




//	Start	our	server
server.listen(process.env.PORT ||	 3000,	process.env.IP ||	"0.0.0.0",	function	 ()	{
  var addr =	server.address();
  console.log("Our	server	is	listening	at",	addr.address +	":"	+	addr.port);
});
