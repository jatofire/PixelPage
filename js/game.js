
function Map(mapWidth, mapHeight, tileWidth, tileHeight) {
  this.tiles = [];
  this.mapWidth = mapWidth;
  this.mapHeight = mapHeight;
  this.tileWidth = tileWidth;
  this.tileHeight = tileHeight;

  this.draw = function(ctx) {
    for(i = 0; i < this.tiles.length; i += 1) {
      this.tiles[i].draw(ctx);
    }
  }

};

var map = new Map(10,10,20,20);
var currentColour = "";

function StartGame() {

  var blueColour = document.getElementById("blueColourID");
  blueColour.addEventListener('click', function() {
    currentColour = "blue";
  });
  var redColour = document.getElementById("redColourID");
  redColour.addEventListener('click', function() {
    currentColour = "red";
  });
  var greenColour = document.getElementById("greenColourID");
  greenColour.addEventListener('click', function() {
    currentColour = "green";
  });
  var yellowColour = document.getElementById("yellowColourID");
  yellowColour.addEventListener('click', function() {
    currentColour = "yellow";
  });
  var blackColour = document.getElementById("blackColourID");
  blackColour.addEventListener('click', function() {
    currentColour = "black";
  });
  var whiteColour = document.getElementById("whiteColourID");
  whiteColour.addEventListener('click', function() {
    currentColour = "white";
  });

  var gameContainer = document.getElementById("game");
  gameContainer.addEventListener('click', function(e) {
    HandleClick(e);
  });

  map.tiles.push(new Tile(20, 20, "red", "Red Tile"));
  map.tiles.push(new Tile(80, 40, "yellow", "Yellow Tile"));

  //tiles[0].draw(gameArea.context);
  gameArea.start(gameContainer);
  currentColour = "black";

}
   
var gameArea = {
  canvas : document.createElement("canvas"),
    start : function(gameContainer) {
        this.canvas.width = 200;
        this.canvas.height = 200;
        this.context = this.canvas.getContext("2d");
        
        gameContainer.appendChild(this.canvas);
       
        //document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;

        this.interval = setInterval(update, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function getRelativeCoords(event) {
    return { x: event.offsetX, y: event.offsetY };
}

function randomMap() {
  //for(i = 0; map.tiles.length *)

}


function HandleClick(e) {
  var t = getRelativeCoords(e);
  console.log("Click x: " + t.x + " y: " + t.y);
  var tile = tileAtPos(t.x, t.y);
  

    var x = t.x - (t.x % map.tileWidth);
    var y = t.y - (t.y % map.tileHeight);

    map.tiles.push(new Tile(x, y, currentColour, "Green Tile"));
  
}




function tileAtPos(x, y){
  for(i = 0; i < map.tiles.length; i +=1 ) {
    if(x >= map.tiles[i].x && x <= map.tiles[i].x + map.tileWidth) {
      if(y >= map.tiles[i].y && y <= map.tiles[i].y + map.tileHeight) {
        return map.tiles[i];
      }
    }
  }
  return null;
}



function update() {


  // Handle Drawing (Move this to another function)

  gameArea.clear();
 
  map.draw(gameArea.context);
  
  
}

// Define a tile

function Tile(x, y, colour, name) {
  this.x = x;
  this.y = y;
  this.colour = colour;
  this.name = name;

  this.draw = function(ctx) {
      ctx.fillStyle = this.colour;
      ctx.fillRect(this.x, this.y, 20, 20);
  };
}
