const game = (function () {
	let canvas;
	let ctx;

	let snake;
    let apple;
    let counter;
    
    /* Variables and constants to control framerate */
    const FPS = 10; /* change this to change framerate in the game */
    let now;
    let then = Date.now();
    const interval = 1000/FPS;
    let delta;

	// Draws the canvas
	function loop() {
        
        now = Date.now();
        delta = now - then;
        
        if (delta > interval) {
            then = now - (delta % interval);
            console.log("Tick, now drawing with: " + FPS + "fps!");
            // draw and check collisions here...
        }
        
        requestAnimationFrame(loop);
	}
    
    function startGame() {
        requestAnimationFrame(loop);
    }

	function init(canvas) {
        canvas.width = GAME_WIDTH;
		canvas.height = GAME_HEIGHT;
        
        ctx = canvas.getContext("2d");
        
        startGame();
	}
    
	return {
		init
	};
})();