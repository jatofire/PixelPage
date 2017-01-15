function LoadPallette() {
	console.log("Loading pallette...");
	
	var palletteContainer = document.getElementById("pallette");
  
  	palletteContainer.addEventListener('click', function(e) {
    
    	
  		
  	});

  //tiles[0].draw(gameArea.context);
  gameArea.start(palletteContainer);

}


var pallette = {
  canvas : document.createElement("canvas"),
    start : function(palletteContainer) {
        this.canvas.width = 480;
        this.canvas.height = 40;
        this.context = this.canvas.getContext("2d");
        
        palletteContainer.appendChild(this.canvas);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}