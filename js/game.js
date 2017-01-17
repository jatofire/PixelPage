
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


  for(i= 0; i < this.mapHeight * this.tileHeight; i += this.tileHeight) {
    for(j = 0; j < this.mapWidth * this.tileWidth; j += this.tileWidth) {
      var tile = new Tile(j, i, currentColour,  currentColour + " Tile");
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
var colourPickPreview;

function StartGame() {

  

  var gameContainer = document.getElementById("game");
  gameContainer.addEventListener('mousedown', function(e) {
      HandleClick(e);
      e.preventDefault();
  });

    gameContainer.addEventListener('mouseup', function(e) {
    mouseDown = false;
    e.preventDefault();
    
  });
      
  gameContainer.addEventListener('mousemove', function(e) {
     HandleMoved(e)
     e.preventDefault();
  });
 
  gameContainer.addEventListener('touchdown', function(e) {
      HandleClick(e);
      e.preventDefault();
  });

  gameContainer.addEventListener('touchup', function(e) {
    mouseDown = false;
    e.preventDefault();
    
  });

   gameContainer.addEventListener('touchmove', function(e) {
     HandleMoved(e)
     e.preventDefault();
  });

  preview = document.getElementById("previewimage");
  mapWidth = document.getElementById("widthInput");
  mapHeight = document.getElementById("heightInput");

  map = new Map(mapWidth.value, mapHeight.value, 20, 20);

  //tiles[0].draw(gameArea.context);
  gameArea.start(gameContainer, map);
  currentColour = "black";
  map.draw(gameArea.context);
	colourPickPreview = document.getElementById("colourpickerpreview");
  //var t = tileAtPos(81, 61);
  //Fill(t);

}


   
var gameArea = {
  canvas : document.createElement("canvas"),
    start : function(gameContainer, map) {
        this.canvas.width = map.mapWidth * map.tileWidth;
        this.canvas.height = map.mapHeight * map.tileHeight;
        this.context = this.canvas.getContext("2d");
        gameContainer.appendChild(this.canvas);
        this.interval = setInterval(update, 20);
		this.container = gameContainer;
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
var t = getRelativeCoords(e);
var tile = tileAtPos(t.x, t.y);
  if(mouseDown === true) {

  
  
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
        tile.clear(gameArea.context);
      }
    }


    if(this.action === "colourpicker") {
		if(tile) {
		colourPickPreview.style.backgroundColor = tile.colour;
		}
	}

  }

  previousTile = index;

  }


	 if(this.action === "colourpicker") {
		
		colourPickPreview.style.backgroundColor = tile.colour;
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
    if(this.action === "erasefill") {
      Fill(tile, true);
    }
	if(this.action === "colourpicker") {
		SetCurrentColour(colourPickPreview.style.backgroundColor);
	}

}

function SetAction(act) {
	this.action = act;
	var gameContainer = document.getElementById("game");

	if(this.action === "colourpicker") {
		gameArea.canvas.style.cursor = 'crosshair';
	}

}

function DrawTile(tile) {
  tile.colour = currentColour;
  tile.visible = true;
}

function MakeImage() {
 preview.src = gameArea.canvas.toDataURL("image/png");
}

function Fill(tile, erase = false) {

  var tilesToCheck = [];
  var tilesChecked = [];
  var checkingTiles = true;
  var tileId = map.tiles.indexOf(tile);
  tilesToCheck.push(tileId);

  var oldColour = tile.colour;
  var oldVisible = tile.visible;
 
  //check top
 
  while(checkingTiles === true) {
    var tilesToAdd = CheckSurrounding(tilesToCheck[0], tilesChecked, oldColour, oldVisible);  
    if(tilesToAdd == null) {} else {

      for(i = 0; i < tilesToAdd.length; i += 1) {

        if(tilesToCheck.indexOf(tilesToAdd[i]) == -1) {

          tilesToCheck.push(tilesToAdd[i]);
        }
      }
    }
    tilesChecked.push(tilesToCheck[0]);
    tilesToCheck.splice(0, 1);
    if(tilesToCheck.length === 0) { checkingTiles = false }; 
  }

  for( j = 0; j < tilesChecked.length; j += 1) {
    
    if(tilesChecked[j] != -1) {
      if(erase === true) {
        map.tiles[tilesChecked[j]].visible = false;
      } else {
        map.tiles[tilesChecked[j]].visible = true;
        map.tiles[tilesChecked[j]].colour = currentColour;
        map.tiles[tilesChecked[j]].draw(gameArea.context);
      }
    }
  }

}



function CheckSurrounding(tileId, checked, colour, visible) {
  
  if(tileId === -1) { return null; }

  var tiles = [];
  if(tileId <= map.tiles.length + 1) {
   
    var tile = map.tiles[tileId];
    //check top
    if(tile.y != 0) {
      var topIndex = tileId - map.mapWidth;
      var topTile = map.tiles[topIndex];
      if(topTile.colour === colour && topTile.visible === visible) {
        if(checked.indexOf(topIndex) === -1) {
          tiles.push(topIndex);
        } 
      }

    }

    //check bottom
    if(tile.y + map.tileHeight != map.mapHeight * map.tileHeight) {
      var bottomIndex = parseInt(tileId) + parseInt(map.mapHeight);
      var bottomTile = map.tiles[bottomIndex];      
      if(bottomTile.colour === colour && bottomTile.visible === visible) {
        if(checked.indexOf(bottomIndex) === -1) {
          tiles.push(bottomIndex);
        } 
      }

    }

    // check left

    if(tile.x != 0) {
      var leftIndex = tileId - 1;
      var leftTile = map.tiles[leftIndex];
      if(leftTile.colour === colour && leftTile.visible === visible) {
        if(checked.indexOf(leftIndex) === -1) {
          tiles.push(leftIndex);
        } 
      }
    }

    /// check right

    if(tile.x + map.tileWidth != map.mapWidth * map.tileWidth) {
      var rightIndex = tileId + 1;
      var rightTile =  map.tiles[rightIndex];
      if(rightTile.colour === colour && rightTile.visible === visible) {
        if(checked.indexOf(rightIndex) === -1) {
          tiles.push(rightIndex);
        }
      }      
    }



  }
  
  if(tiles.length > 0) {
    return tiles;
  } else {
    return null;
  }
}


function tileAtPos(x, y){

  var newx = x - (x % map.tileWidth);
  var newy = y - (y % map.tileHeight);

  var xindex = newx / map.tileWidth;
  var yindex = newy / (map.tileHeight) * map.mapHeight;
  var index = xindex + yindex;
  return  map.tiles[index];

}

function tileIndexAtPos(x, y){

  var newx = x - (x % map.tileWidth);
  var newy = y - (y % map.tileHeight);

  var xindex = newx / map.tileWidth;
  var yindex = newy / (map.tileHeight) * map.mapHeight;
  var index = xindex + yindex;
  return index;

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

  this.clear = function(ctx) {
    ctx.clearRect(this.x, this.y, 20, 20);
  }




}


 function SetColour() {

    var e = document.getElementById('colourPicker');
   SetCurrentColour(e.value);


  }
