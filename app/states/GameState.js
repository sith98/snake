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
        appleDispatcher.init()
    }    

    const FPS = 10;
    const interval = 1000 / FPS;
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