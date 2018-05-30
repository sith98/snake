const game = (function () {
	let canvas;
	let ctx;

	let snake;
    let appleDispatcher;
    let counter;
    
    const WIDTH = 30;
    const HEIGHT = 30;
    const GRID_SIZE = 10;
    
    
    let gameOver = false;
    
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
        }
        draw();
        if (!gameOver) {
            requestAnimationFrame(loop);
        }
    }
    
    const update = () => {
        snake.update(appleDispatcher.apple, onAppleEaten, onSnakeDead)
    }
    const draw = () => {
        if (gameOver) {
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const drawProps = {
            canvas,
            ctx,
            gridSize: GRID_SIZE
        }

        snake.draw(drawProps);
        appleDispatcher.apple.draw(drawProps);
        counter.draw(drawProps);
    }
    
    const onKeyDown = (evt) => {
        snake.onKeyDown(evt)
    }
    
    const onAppleEaten = () => {
        counter.inc();
        appleDispatcher.spawnApple(snake.getEmptyFields())
    }
    
    const onSnakeDead = () => {
        console.log("game over")
        endGame()
    }
    
    const startGame = () => {
        gameOver = false;
        
        const centerX = Math.floor(WIDTH / 2)
        const centerY = Math.floor(HEIGHT / 2)
        
        snake = makeSnake({gameWidth: WIDTH, gameHeight: HEIGHT});
        counter = makeCounter();

        appleDispatcher = makeAppleDispatcher()
        appleDispatcher.spawnApple(snake.getEmptyFields())
        
        requestAnimationFrame(loop);
    }
    
    const endGame = () => {
        gameOver = true;
    }

	const init = (canvasElement) => {
        canvas = canvasElement;
        
        canvas.width = WIDTH * GRID_SIZE;
		canvas.height = HEIGHT * GRID_SIZE;
        
        ctx = canvas.getContext("2d");
        
        document.body.addEventListener("keydown", onKeyDown)
        
        startGame();
	}
    
	return {
		init
	};
})();