const makeGameState = ({canvasSize, ctx, startState, saveGame}) => {
    // Number of columns
    const WIDTH = 30;
    // Number of rows
    const HEIGHT = 30;
    const GRID_SIZE = Math.floor(canvasSize / WIDTH);

    let snake;
    let counter;
    let appleDispatcher;

    const init = () => {
        // the snake needs to know the number of rows and columns
        snake = makeSnake({gameWidth: WIDTH, gameHeight: HEIGHT});
        // the counter can get and set the current highscore
        counter = makeCounter({saveGame});
        
        // the apple dispatcher cannot spawn an apple itself
        // because it needs to know what fields are empty
        // therefore the dispatcher receives a reference to the state's
        // spawn apple function it can call instead
        appleDispatcher = makeAppleDispatcher({gameSpawnApple: spawnApple})
        appleDispatcher.init();
        setFps(NORMAL_FPS);
    }    

    const NORMAL_FPS = 10;
    const FAST_FPS = 20;
    const SLOW_FPS = 5;
    

    let fps;
    let interval;
    // if fpsTimer is 0, the state automatically goes back to normal speed
    // is needed for powerups "Faster" and "Slower"
    let fpsTimer;
    const setFps = (newFps, timer = 0) => {
        fps = newFps;
        interval = 1000 / fps;
        fpsTimer = timer;
    }

    let then = Date.now();
    const update = () => {
        const now = Date.now();
        const delta = now - then;
        
        if (delta > interval) {
            then = now - (delta % interval);
            internalUpdate();
        }
    }

    const internalUpdate = () => {
        // Resets fps to normal when timer has reached zero
        if (fpsTimer === 0) {
            setFps(NORMAL_FPS);
        } else {
            fpsTimer -= 1;
        }
        // snake needs a reference to an array of all present apples
        // for collision detection
        // It also receives callbacks to let the state know when it has
        // eaten an apple or has died
        snake.update({apples: appleDispatcher.apples, gameOnAppleEaten: onAppleEaten, onSnakeDead});
        appleDispatcher.update();
    }

    const draw = () => {
        // information the game objects need to render properly
        const drawProps = Object.freeze({
            canvasSize,
            ctx,
            gridSize: GRID_SIZE
        })

        snake.draw(drawProps);
        appleDispatcher.draw(drawProps);
        counter.draw(drawProps);
    }

    // gets called by apple dispatcher
    // it asks the snake for all empty fields and then in turn
    // calls the apple dispatcher's internal spawnApple method
    const spawnApple = (type) => {
        appleDispatcher.spawnApple(snake.getEmptyFields(), type);
    }
    
    const onKeyDown = (evt) => {
        snake.onKeyDown(evt)
    }

    // lets other game objects know if an apple was being eaten
    // and also deals with the powerups which influence the state
    // directly instead of the snake
    const onAppleEaten = (apple) => {
        snake.onAppleEaten(apple);
        counter.onAppleEaten(apple);
        appleDispatcher.onAppleEaten(apple)
        
        switch (apple.type) {
            case AppleType.FASTER:
                setFps(FAST_FPS, 80);
                break;
            case AppleType.SLOWER:
                setFps(SLOW_FPS, 40);
                break;
        }
    }
    
    const onSnakeDead = () => {
        endGame()
    }

    // starts Game Over State and passes
    // - the current score,
    // - if the score has been a new highscore,
    // - and a "screenshot" of the current game situation
    const endGame = () => {
        startState(makeGameOverState, {
            score: counter.value,
            background: ctx.getImageData(0, 0, canvasSize, canvasSize),
            isNewHighscore: counter.isNewHighscore
        })
    }

    init();
    return Object.freeze({
        update,
        draw,
        onKeyDown
    })
}