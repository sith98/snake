const game = (function () {
    let canvas;
    let ctx;

    let state;
    let saveGame

    const CANVAS_SIZE = 510;

    const init = (canvasElement) => {
        canvas = canvasElement;

        canvas.width = CANVAS_SIZE;
        canvas.height = CANVAS_SIZE;

        ctx = canvas.getContext("2d");
        
        saveGame = makeSaveGame();
        
        document.body.addEventListener("keydown", onKeyDown)
        startGame();
    }


    const startGame = () => {
        startState(makeGameState)
        requestAnimationFrame(loop);
    }

    // starts a new state with some optional additional args
    const startState = (stateMaker, args = {}) => {
        // Game variables and functions the state should have access
        const gameApi = Object.freeze({
            canvas,
            ctx,
            saveGame,
            startState,
        })

        // Provide default implementations for where a state does not implement
        // all expected methods.
        state = Object.assign({
            update: () => {},
            draw: () => {},
            onKeyDown: () => {},
        }, stateMaker(gameApi, args))
    }


    const loop = () => {
        update();
        draw();
        requestAnimationFrame(loop);
    }

    const update = () => {
        state.update();
    }

    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        state.draw();
    }

    const onKeyDown = (evt) => {
        state.onKeyDown(evt)
    }


    return {
        init
    };
})();