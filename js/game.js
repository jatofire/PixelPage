
function Map(mapWidth, mapHeight, tileWidth, tileHeight) {
  this.tiles = [];
  this.mapWidth = mapWidth;
  this.mapHeight = mapHeight;
  this.tileWidth = tileWidth;
  this.tileHeight = tileHeight;

  this.draw = function(ctx) {
    for(i = 0; i < this.tiles.length; i += 1) {
      if(this.tiles[i].visible === true) {
        this.tiles[i].draw(ctx);
      }
    }
  }


  for(i= 0; i < this.mapWidth * this.tileWidth; i += this.tileWidth) {
    for(j = 0; j < this.mapHeight * this.tileHeight; j += this.tileHeight) {
      var tile = new Tile(i, j, currentColour,  currentColour + " Tile");
      tile.visible = false;
      this.tiles.push(tile);
    }
  }



};

var map;
var preview;
var currentColour = "grey";
var action = "draw";
var mouseDown = false;

var previousTile;


function StartGame() {

  

  var gameContainer = document.getElementById("game");
  gameContainer.addEventListener('mousedown', function(e) {
      HandleClick(e);
  });

    gameContainer.addEventListener('mouseup', function(e) {
    mouseDown = false;
    
  });
      
  gameContainer.addEventListener('mousemove', function(e) {
     HandleMoved(e)
  });

  preview = document.getElementById("previewimage");
  mapWidth = document.getElementById("widthInput");
  mapHeight = document.getElementById("heightInput");

  map = new Map(mapWidth.value, mapHeight.value, 20, 20);
  //tiles[0].draw(gameArea.context);
  gameArea.start(gameContainer, map);
  currentColour = "black";

}


   
var gameArea = {
  canvas : document.createElement("canvas"),
    start : function(gameContainer, map) {
        this.canvas.width = map.mapWidth * map.tileWidth;
        this.canvas.height = map.mapHeight * map.tileHeight;
        this.context = this.canvas.getContext("2d");
        gameContainer.appendChild(this.canvas);
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

function SetCurrentColour(colour) {
  var previewColour = document.getElementById("currentColourPreview");
  previewColour.style.backgroundColor = colour;
  currentColour = colour;
}

function HandleMoved(e) {
  if(mouseDown === true) {

  var t = getRelativeCoords(e);
  
  if(t.x < 0 || t.x > gameArea.canvas.width || t.y < 0 || t.y > gameArea.canvas.height) {
    mouseDown = false;
    return;
  }
  
  console.log("Action: " + this.action);
  var tile = tileAtPos(t.x, t.y);
  var index = map.tiles.indexOf(tile);

  if(previousTile == index) {
  } else {

    if(this.action === "draw") {
      console.log("Draw");
      DrawTile(tile);
    }
    if(this.action === "erase") {
      if(tile != null) {
        console.log("Erase");
        tile.visible = false;
      }
    }
  }

  previousTile = index;

  }
}


function HandleClick(e) {
  
  var t = getRelativeCoords(e);
  var tile = tileAtPos(t.x, t.y);
  
  if(this.action === "draw") {
      console.log("Draw");
      DrawTile(tile);
      mouseDown = true;
    }
    if(this.action === "erase") {
      if(tile != null) {
        console.log("Erase");
        tile.visible = false;
        mouseDown = true;
      }
    }
    if(this.action === "fill") {
      Fill(tile);
    }

}

function SetAction(act) {
  this.action = act;
  console.log("Action changed to: " + this.action);
}

function DrawTile(tile) {
  tile.colour = currentColour;
  tile.visible = true;
}

function MakeImage() {
 preview.src = gameArea.canvas.toDataURL("image/png");
}

function Fill(tile) {
  
  var tilesToCheck = [];
  var tilesChecked = [];
  var checkingTiles = true;
  tilesToCheck.push(tile);

 
 
  //check top
 
  while(checkingTiles === true) {
    
    
    //console.log("Tiles to add length: " + tilesToAdd.length);

    var tilesToAdd = CheckSurrounding(tilesToCheck[0]);
    console.log("Tiles to add length: " + tilesToAdd.length);


    if(tilesToAdd == null) {} else {
      for(i= 0; i < tilesToAdd.length; i +=1 ) {
        console.log("Checking tile: " + this.tilesToAdd[i].y);
      }
    }
  
    if(tilesToAdd == null) {} else {

      for(i = 0; i < tilesToAdd.length; i += 1) {
        tilesToCheck.push(tilesToAdd[i]);
      }
    }

    var indexToAdd = map.tiles.indexOf(tilesToCheck[0]);

    tilesChecked.push(indexToAdd);
    tilesToCheck.splice(0, 1);
    console.log("Tiles to check length: " + tilesToCheck.length);
    console.log("Tiles checked length: " + tilesChecked.length);
    if(tilesToCheck.length === 0) { checkingTiles = false }; 
  }




  for( j = 0; j < tilesChecked.length; j += 1) {
    console.log("Checked: " + tilesChecked[j]);
    if(tilesChecked[j] != -1) {
      map.tiles[tilesChecked[j]].visible = true;
      map.tiles[tilesChecked[j]].colour = "red";
    }
  }



}

function CheckSurrounding(tile) {
  
  var tiles = [];
 console.log("Checking tile in surrounding: " + tile.y);
  //check top
  if(tile.y - 10 > 0) {
    var topTile = tileAtPos(tile.x + 10, tile.y - 10);
    var topIndex = map.tiles.indexOf(topTile);
    tiles.push(this.topIndex);
  }

  //check bottom
 if(tile.y + 10 < map.mapHeight * map.tileHeight) {
    var bottomTile = tileAtPos(tile.x + map.tileHeight + 10, tile.y + 10);
    var bottomIndex = map.tiles.indexOf(bottomTile);
    tiles.push(this.bottomIndex);
  }

  // check right


  /// check left

  
  if(tiles.length > 0) {
    return tiles;
  } else {
    return null;
  }
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
  this.visible = true;
  this.draw = function(ctx) {
      ctx.fillStyle = this.colour;
      ctx.fillRect(this.x, this.y, 20, 20);
  };
}
