const makeMainMenuState = ({canvasSize, ctx, startState}) => {
    const startTimer = Date.now()


    // LOGIC

    const SPACE = 32;
    const onKeyDown = (evt) => {
        if (evt.keyCode === SPACE) {
            startState(makeGameState);
        }
    }


    const centerX = canvasSize / 2;


    const texts = {
        text1: {
            text: "Snake",
            start: 100,
            end: 700,
            size: canvasSize / 7,
            y: canvasSize * 0.4,
        },
        text2: {
            text: "by Simon Thelen",
            start: 600,
            end: 1200,
            size: canvasSize / 20,
            y: canvasSize * 0.5,
        },
        text3: {
            text: "Press SPACE to start playing",
            start: 1100,
            end: 1700,
            size: canvasSize / 17,
            y: canvasSize * 0.6,
        },
    }

    const animationInterpolate = (value, textIndex) =>
        boundInterpolate(value, texts[textIndex].start, texts[textIndex].end, 0, 1)

    const draw = () => {
        const currentTimer = Date.now() - startTimer;

        ctx.textAlign = "center";
        ctx.textBaseline = "middle"

        for (const [textIndex, text] of Object.entries(texts)) {
            const alpha = animationInterpolate(currentTimer, textIndex);

            // blinking animation for "Press SPACE to start playing"
            if (textIndex === "text3" && currentTimer >= text.end) {
                const time = currentTimer - text.end;
                ctx.fillStyle = `rgba(255, 255, 255, ${0.6 + 0.4 * Math.cos(time * 0.005)}`;
            } else {
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            }

            ctx.font = text.size + "px Arial";
            ctx.fillText(text.text, centerX, text.y);
        }
    }

    return Object.freeze({
        draw,
        onKeyDown
    })
}