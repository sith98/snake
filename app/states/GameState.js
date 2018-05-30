const makeGameState = ({canvas, ctx, startState}) => {
    const WIDTH = 30;
    const HEIGHT = 30;
    const GRID_SIZE = Math.floor(Math.min(canvas.width, canvas.height) / WIDTH);

    let snake = makeSnake({gameWidth: WIDTH, gameHeight: HEIGHT});
    let counter = makeCounter();

    let appleDispatcher = makeAppleDispatcher()
    appleDispatcher.spawnApple(snake.getEmptyFields())

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
        snake.update(appleDispatcher.apple, onAppleEaten, onSnakeDead)
    }

    const draw = () => {
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
        endGame()
    }

    const endGame = () => {
        startState(makeGameOverState, {
            score: counter.value,
            background: ctx.getImageData(0, 0, canvas.width, canvas.height)
        })
    }


    return Object.freeze({
        update,
        draw,
        onKeyDown
    })
}