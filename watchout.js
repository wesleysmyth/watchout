// start slingin' some d3 here.

//draw a box that is an svg element
//append svg to dom
var boardHeight = screen.height - 180;
var boardWidth = screen.width - 40;
var gameBoard = d3.select('body').append('svg:svg')
                .attr('class','gameBoard')
                .attr('width', boardWidth)
                .attr('height', boardHeight);

gameBoard.moveTime = 5500;

//make enemies as img nodes pointing them to the asteroid.png
// or in d3: set the source attribute equal to the path for the png file

var makeEnemies = function(n) {
  gameBoard.enemyHeight = 25;
  gameBoard.enemyWidth = 25;
  gameBoard.n = n;
  //create an array of random positions
  //this will be the actual data that we pass in
  //figure out whether to use attribute or style to set the position
  //create the random positions arr
  var randomPositions = [];
  for (var i = 0; i < n; i++) {
    var xy = [];
    xy.push(Math.random()*(boardWidth-gameBoard.enemyWidth));
    xy.push(Math.random()*(boardHeight-gameBoard.enemyHeight));
    randomPositions.push(xy);
  }

  var enemies = gameBoard.
    selectAll('image').
    data(randomPositions).
    enter().
    append('svg:image').
    attr('xlink:href', 'asteroid.png').
    attr('height',gameBoard.enemyHeight + 'px').
    attr('width',gameBoard.enemyWidth + 'px').
    attr('class', 'enemies').
    style('opacity',0).
    attr('x', function(d) {return d[0];}).
    attr('y', function(d) {return d[1];}).
    transition().
    duration(1500).
    style('opacity',1);

  return enemies;
}
makeEnemies(100);


//every second part
//select all the svg images
//pass in a new data array
//update the data associated with each image
//add the x and y attributes for each image
//transition the images to a new position over a duration
//rock out

//move to a new random location
//every second
// d3.selectAll('img').attr(position, function() {math.random})
//can use a style() to set the position too
//use a .transition in there

var moveAround = function() {
  //modularize randomPositions
  var randomPositions = [];
  for (var i = 0; i < gameBoard.n; i++) {
    var xy = [];
    xy.push(Math.random()*(boardWidth-gameBoard.enemyWidth));
    xy.push(Math.random()*(boardHeight-gameBoard.enemyHeight));
    randomPositions.push(xy);
  }

  gameBoard.
    selectAll('.enemies').
    data(randomPositions).
    transition().
    duration(5000).
    attr('x', function(d){ return d[0]}).
    attr('y', function(d){ return d[1]});

  // document.getElementById('currentScore').innerHTML = currentScore;
};

// initialize enemy movement after enemies have faded in
setTimeout(function(){
  moveAround();
  // keep enemies moving every gameBoard.moveTime milliseconds
  setInterval(function(){
    moveAround();
  }, gameBoard.moveTime);
}, 1501);

setInterval(function(){
  currentScore += 1;
  d3.select('#currentScore').
  data([currentScore]).
  transition().
  duration(gameBoard.moveTime).
  text(function(d) {
    return d;
  });
}, gameBoard.moveTime/gameBoard.n);


//create a differently colored dot for the player
//investigate api for d3. they have a drag thing
// create a node for the player dot. is it html or svg?
//   g node? investigate.
//make sure we can use images in that node

//opportunity to refactor to pseudoclassical instantiation pattern to create new instances of players

var addPlayer = function() {
  var radius = 25;
  var inData = [{x: boardWidth/2, y: boardHeight/2, r:25}];
  gameBoard.playerRadius = radius;

  var drag = d3.behavior.drag()
   .on('dragstart', function() { circle.style('fill', 'red'); })
   .on('drag', function() { circle.attr('cx', d3.event.x)
                                  .attr('cy', d3.event.y); })
   .on('dragend', function() { circle.style('fill', 'black'); });

 var circle = gameBoard.selectAll('.player')
   .data(inData)
   .enter()
   .append('svg:circle')
   .attr('class', 'player')
   .attr('cx', function(d) { return d.x; })
   .attr('cy', function(d) { return d.y; })
   .attr('r', function(d) { return d.r; })
   .call(drag)
   .style('fill', 'black');
}
addPlayer();


//detect when an enemy touches you.
//investiage the api for drag for this
//investigate api for collisions
//investigate the source code for the example game

// create coordinates object to store player coordinates
var coordinatesObj = {};

var playerCoordinates = function() {
  d3.selectAll(".player").each( function(d, i){
    coordinatesObj.x = d3.select(this).attr("cx");
    coordinatesObj.y = d3.select(this).attr("cy");
  });
};

// buffer to take into account the size of the enemies and the player
var buffer = gameBoard.playerRadius + gameBoard.enemyHeight / 2;

var recentlyCollided = 0;
var collisionsCount = 0;
var currentScore = 0;
var highScore = 0;

// setInterval checks for collisions every 50 milliseconds
setInterval(function(){
  // find where player is on gameBoard
  playerCoordinates();
  //select all the enemies and determine whether or not they have the same coordinates as the player (collision)
  d3.selectAll('.enemies').each(function(d){
    // make the player invincible if a collision has recently occured
    if(recentlyCollided === 0) {
      if(Math.abs(d3.select(this).attr('x') - coordinatesObj.x) < buffer){
        // only need to check y coordinates if x coordinates are within the buffer range
        if (Math.abs(d3.select(this).attr('y') - coordinatesObj.y) < buffer){
          recentlyCollided++;
          // change player's color while invincible
          d3.select('.player').style('fill', 'green');
          collisionsCount++;
          // update collisionsCount on the DOM
          document.getElementById('collisionsCount').innerHTML = collisionsCount;
          if (currentScore > highScore) {
            highScore = currentScore;
            document.getElementById('highScore').innerHTML = highScore;
          }
          currentScore = 0;
          // reset player vulnerability
          setTimeout(function() {
            d3.select('.player').style('fill', 'black');
            recentlyCollided--;
          },1000);
        }
      }
    }
  });
}, 10);

// keep track of current score
// score will increase by number of enemies on screen
// will increase once every setInterval period



// style it
// extra credit: two player game
// refactor to pseudoclassical for the player
// web sockets for multiplayer
//


















//keep track of the score
//keep a counter that keeps incrementing by the number of dots each second
//we can maybe make this a transition() to slow the number rather than incrementing by the number of dots each second

