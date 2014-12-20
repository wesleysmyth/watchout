// start slingin' some d3 here.

//draw a box that is an svg element
//append svg to dom
var boardHeight = screen.height - 180;
var boardWidth = screen.width - 40;
var gameBoard = d3.select('body').append('svg:svg')
                .attr('class','gameBoard')
                .attr('width', boardWidth)
                .attr('height', boardHeight);


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
makeEnemies(10);


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

};

setTimeout(function(){
  moveAround();
}, 1100);

setInterval(function(){
  moveAround();
}, 5500);


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

// setInterval checks for collisions every 50 milliseconds
setInterval(function(){
  playerCoordinates();
  d3.selectAll('.enemies').each(function(d){
    if(recentlyCollided === 0) {
      if(Math.abs(d3.select(this).attr('x') - coordinatesObj.x) < buffer){
        if (Math.abs(d3.select(this).attr('y') - coordinatesObj.y) < buffer){
          d3.select('.player').style('fill', 'green');
          document.getElementById('collisionsCount').innerHTML++;
          recentlyCollided++;
          setTimeout(function() {
            d3.select('.player').style('fill', 'black');
            recentlyCollided--;
          },1000);
        }
      }
    }
  });
}, 50);


// increment the counters appropriately
// style it
// extra credit: two player game
// refactor to pseudoclassical for the player
// web sockets for multiplayer
//


















//keep track of the score
//keep a counter that keeps incrementing by the number of dots each second
//we can maybe make this a transition() to slow the number rather than incrementing by the number of dots each second

