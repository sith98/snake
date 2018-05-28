const game = (function () {
	let canvas;
	let ctx;

	let snake;
    let apple;
    let counter;
    
    const WIDTH= 300;
    const HEIGHT= 300;
    const GRID_SIZE= 10;
    
    /* Variables and constants to control framerate */
    const FPS = 10; /* change this to change framerate in the game */
    let now;
    let then = Date.now();
    const interval = 1000/FPS;
    let delta;

	// Draws the canvas
	const loop = () => {
        now = Date.now();
        delta = now - then;
        
        if (delta > interval) {
            then = now - (delta % interval);
            update();
            draw();
        }
        requestAnimationFrame(loop);
	}
    
    const update = () => {
        snake.update(apple, newApple)
    }
    const draw = () => {
        ctx.clearRect(0, 0, Dimensions.WIDTH, Dimensions.HEIGHT);
        snake.draw(ctx, GRID_SIZE);
        apple.draw(ctx, GRID_SIZE);
    }
    
    const onKeyDown = (evt) => {
        snake.onKeyDown(evt)
    }
    
    const newApple = () => {
        apple = makeApple(
            Math.floor(WIDTH / GRID_SIZE),
            Math.floor(HEIGHT / GRID_SIZE)
        )
    }
    
    const startGame = () => {
        const centerX = Math.floor(WIDTH / GRID_SIZE / 2)
        const centerY = Math.floor(HEIGHT / GRID_SIZE / 2)
        
        snake = makeSnake(centerX, centerY);
        newApple()
        
        requestAnimationFrame(loop);
    }

	const init = (canvas) => {
        canvas.width = WIDTH;
		canvas.height = HEIGHT;
        
        ctx = canvas.getContext("2d");
        
        document.body.addEventListener("keydown", onKeyDown)
        
        startGame();
	}
    
	return {
		init
	};
})();