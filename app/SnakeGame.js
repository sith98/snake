// made by Simon Thelen

const game = (function () {
    let canvas;
    let ctx;
    
    // Each state represents one seperate screen
    // MainMenuState, GameState, GameOverState
    let state;
    // Permenantly stores highscore
    let saveGame;
    // loads and stores images
    let imageLoader;
    // loads, stores and plays sounds
    let soundPlayer;

    // both width and height of the canvas
    const CANVAS_SIZE = 600;

    const init = (canvasElement) => {
        canvas = canvasElement;

        canvas.width = CANVAS_SIZE;
        canvas.height = CANVAS_SIZE;

        ctx = canvas.getContext("2d");
        
        saveGame = makeSaveGame();

        imageLoader = makeImageLoader();

        soundPlayer = makeSoundPlayer();

        document.body.addEventListener("keydown", onKeyDown)
        Promise.all([imageLoader.load(), soundPlayer.load()]).then(startGame);
    }


    const startGame = () => {
        startState(makeMainMenuState)
        requestAnimationFrame(loop);
    }

    // starts a new state with some optional additional args
    const startState = (stateMaker, args = {}) => {
        // Game variables and functions every state should have access to
        const gameApi = Object.freeze({
            canvasSize: CANVAS_SIZE,
            ctx,
            saveGame,
            startState,
            imageLoader,
            soundPlayer,
        })

        // Provides default implementations in case a state does not implement
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
        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        state.draw();
    }

    const onKeyDown = (evt) => {
        state.onKeyDown(evt)
    }

    return Object.freeze({
        init
    });
})();