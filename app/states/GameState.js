const makeGameState = ({canvasSize, ctx, startState, saveGame}) => {
    const WIDTH = 30;
    const HEIGHT = 30;
    const GRID_SIZE = Math.floor(Math.min(canvasSize, canvasSize) / WIDTH);

    let snake;
    let counter;
    let appleDispatcher;

    const init = () => {
        snake = makeSnake({gameWidth: WIDTH, gameHeight: HEIGHT});
        counter = makeCounter({saveGame});
    
        appleDispatcher = makeAppleDispatcher({gameSpawnApple: spawnApple})
        appleDispatcher.init();
        setFps(NORMAL_FPS);
    }    

    const NORMAL_FPS = 10;
    const FAST_FPS = 20;
    const SLOW_FPS = 5;
    

    let fps;
    let interval;
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
        console.log(fps);
        if (fpsTimer === 0) {
            setFps(NORMAL_FPS);
        } else {
            fpsTimer -= 1;
        }
        snake.update(appleDispatcher.apples, onAppleEaten, onSnakeDead);
        appleDispatcher.update();
    }

    const draw = () => {
        const drawProps = {
            canvasSize,
            ctx,
            gridSize: GRID_SIZE
        }

        snake.draw(drawProps);
        appleDispatcher.draw(drawProps);
        counter.draw(drawProps);
    }

    const spawnApple = (type) => {
        appleDispatcher.spawnApple(snake.getEmptyFields(), type);
    }
    
    const onKeyDown = (evt) => {
        snake.onKeyDown(evt)
    }

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