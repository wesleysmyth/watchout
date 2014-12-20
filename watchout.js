// start slingin' some d3 here.

//draw a box that is an svg element
//append svg to dom
var boardHeight = screen.height - 180;
var boardWidth = screen.width - 40;
var gameBoard = d3.select('body').append('svg:svg')
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
makeEnemies(100);
//setTimeout(function() {return makeEnemies(15);},3000);

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

// var moveAround = function() {

//   var randomPositions = [];
//   for (var i = 0; i < gameBoard.n; i++) {
//     var xy = [];
//     xy.push(Math.random()*(boardWidth-gameBoard.enemyWidth));
//     xy.push(Math.random()*(boardHeight-gameBoard.enemyHeight));
//     randomPositions.push(xy);
//   }

//   gameBoard.
//   selectAll('.enemies').
//   data(randomPositions).
//   transition().
//   duration(5000).
//   attr('x', function(d){ return d[0]}).
//   attr('y', function(d){ return d[1]});

// };
// setTimeout(function(){
//   moveAround();
// }, 1100);
// setInterval(function(){
//   moveAround();
// }, 5500);


//create a differently colored dot for the player
//investigate api for d3. they have a drag thing
// create a node for the player dot. is it html or svg?
//   g node? investigate.
//make sure we can use images in that node

//detect when an enemy touches you.
//investiage the api for drag for this
//investigate api for collisions
//investigate the source code for the example game


//keep track of the score
//keep a counter that keeps incrementing by the number of dots each second
//we can maybe make this a transition() to slow the number rather than incrementing by the number of dots each second

