const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

const cellsHorizontal = 12;
const cellsVertical = 10;
const width = window.innerWidth;
const height = window.innerHeight;

const unitLengthX = width / cellsHorizontal;
const unitLengthY = height / cellsVertical;

//create a new engine 
const engine = Engine.create();
engine.world.gravity.y = 0;
//access the world that got created along with the engine
const {world} = engine;
//create a render object that will show some content on the screen
const render = Render.create({
//tell the render where we want to show things inside our html document
element: document.body,
engine: engine,
options: {
    wireframes: false,
    width,
    height
}
});
Render.run(render);
Runner.run(Runner.create(), engine);

//creating the border
const walls = [
    Bodies.rectangle(width/2, 0, width, 2, {isStatic: true}),
    Bodies.rectangle(width/2, height, width, 2, {isStatic: true}),
    Bodies.rectangle(0, height/2 , 2, height, {isStatic: true}),
    Bodies.rectangle(width, height/2, 2, height, {isStatic: true}),
];

World.add(world,walls);

//creating the grid
//outer array number indicates rows
//inner array number indicates columns

//shuffling the start on the grid
const shuffle = (arr) => {
    let counter = arr.length;
    while(counter > 0){
        const index = Math.floor(Math.random() * counter);

        counter--;

        const temp = arr[counter];
        arr[counter] = arr[index];
        arr[index] = temp;
    }
    return arr;
};

const grid = Array(cellsVertical)
.fill(null)
.map( () => Array(cellsHorizontal).fill(false) );

//make the number of vertical walls
const verticals = Array(cellsVertical)
.fill(null)
.map( () => Array(cellsHorizontal - 1).fill(false));

//make the number of horizontal walls
const horizontals = Array(cellsVertical - 1)
.fill(null)
.map( () => Array(cellsHorizontal).fill(false));

//creating the random starting point
const startRow = Math.floor(Math.random() * cellsVertical);
const startColumn = Math.floor(Math.random() * cellsHorizontal);
const stepThroughCell = (row, column) => {
    // If i have visted the cell at [row, column], then return
    if (grid[row][column]) {
      return;
    }
  
    // Mark this cell as being visited
    grid[row][column] = true;
  
    // Assemble randomly-ordered list of neighbors
    const neighbors = shuffle([
      [row - 1, column, 'up'],
      [row, column + 1, 'right'],
      [row + 1, column, 'down'],
      [row, column - 1, 'left']
    ]);
    // For each neighbor....
    for (let neighbor of neighbors) {
      const [nextRow, nextColumn, direction] = neighbor;
  
      // See if that neighbor is out of bounds
      if (
        nextRow < 0 ||
        nextRow >= cellsVertical ||
        nextColumn < 0 ||
        nextColumn >= cellsHorizontal
      ) {
        continue;
      }
  
      // If we have visited that neighbor, continue to next neighbor
      if (grid[nextRow][nextColumn]) {
        continue;
      }
  
      // Remove a wall from either horizontals or verticals
      if (direction === 'left') {
        verticals[row][column - 1] = true;
      } else if (direction === 'right') {
        verticals[row][column] = true;
      } else if (direction === 'up') {
        horizontals[row - 1][column] = true;
      } else if (direction === 'down') {
        horizontals[row][column] = true;
      }
  
      stepThroughCell(nextRow, nextColumn);
    }
  
    // Visit that next cell
  };
  
  stepThroughCell(startRow, startColumn);

  horizontals.forEach((row, rowIndex) => {
      row.forEach ((open, columnIndex) => {
          if(open){
              return;
          };

          const wall = Bodies.rectangle(columnIndex * unitLengthX + unitLengthX / 2, 
                                        rowIndex * unitLengthY + unitLengthY,
                                        unitLengthX, 
                                        3,
                                        {
                                            label: "wall",
                                            isStatic: true,
                                            render: {
                                                fillStyle: '#f5f5f5'
                                            }
                                        });
          World.add(world,wall);
      });
  });

  verticals.forEach((row, rowIndex) => {
    row.forEach ((open, columnIndex) => {
        if(open){
            return;
        };

        const wall = Bodies.rectangle(columnIndex * unitLengthX + unitLengthX, 
                                      rowIndex * unitLengthY + unitLengthY / 2,
                                      3, 
                                      unitLengthY,
                                      {
                                          label: "wall",
                                          isStatic: true,
                                          render: {
                                              fillStyle: '#f5f5f5'
                                          }
                                      });
        World.add(world,wall);
    });
});

//Goal
                            //(x coordinates center point, y coordinate centerpoint, scale the rectangle height and width with canvas, make it static)
const goal = Bodies.rectangle(width - unitLengthX/2, height - unitLengthY/2, unitLengthX * 0.7, unitLengthY * 0.7, { label: "goal", isStatic: true, render: {
    fillStyle: 'green'
}
});

World.add(world, goal);


//Ball
const ballRadius = Math.min((unitLengthX, unitLengthY) / 4);
const ball = Bodies.circle(unitLengthX / 2, unitLengthY / 2, ballRadius, {
    label: "ball",
    render: {
        fillStyle: 'orange'
    }
});
World.add(world,ball);

//ball movement
document.addEventListener('keydown', event => {
    const {x,y} = ball.velocity;
    
    if(event.keyCode === 87){
//up
    Body.setVelocity(ball, {x, y: y - 5});
    }   

    if(event.keyCode === 68){
//right
    Body.setVelocity(ball, {x: x + 5, y});
    } 

    if(event.keyCode === 83){
//down
    Body.setVelocity(ball, {x, y: y + 5});
    } 

    if(event.keyCode === 65){
//left
    Body.setVelocity(ball, {x: x - 5, y});
    } 

});

//win condition
Events.on(engine, "collisionStart", event => {
    event.pairs.forEach((collision) =>{
        const labels = ["ball", "goal"];
    if (labels.includes(collision.bodyA.label) && labels.includes(collision.bodyB.label)){
       world.gravity.y = 1;
       world.bodies.forEach(body => {
           if(body.label === "wall"){
               Body.setStatic(body, false);
           }
       })

    }

    });
});