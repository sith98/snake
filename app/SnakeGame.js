const game = (function () {
	let canvas;
    let ctx;

    let state;

    const CANVAS_WIDTH = 300;
    const CANVAS_HEIGHT = 300;

    const init = (canvasElement) => {
        canvas = canvasElement;
        
        canvas.width = CANVAS_WIDTH;
		canvas.height = CANVAS_HEIGHT;
        
        ctx = canvas.getContext("2d");
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
            startState,
        })
        state = stateMaker(gameApi, args)
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