// start slingin' some d3 here.

//draw a box that is an svg element
//append svg to dom


//make enemies as img nodes pointing them to the asteroid.png
// or in d3: set the source attribute equal to the path for the png file

//move to a new random location
//every second
d3.selectAll('img').attr(position, function() {math.random})
//can use a style() to set the position too
//use a .transition in there


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

