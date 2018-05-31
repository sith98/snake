const makeMainMenuState = ({canvas, ctx, startState}) => {
    const startTimer = Date.now()


    // LOGIC

    const SPACE = 32;
    const onKeyDown = (evt) => {
        if (evt.keyCode === SPACE) {
            startState(makeGameState);
        }
    }


    const centerX = canvas.width / 2;


    const texts = {
        text1: {
            text: "Snake",
            start: 100,
            end: 700,
            size: canvas.width / 7,
            y: canvas.height * 0.4,
        },
        text2: {
            text: "By Simon Thelen",
            start: 600,
            end: 1200,
            size: canvas.width / 20,
            y: canvas.height * 0.5,
        },
        text3: {
            text: "Press SPACE to start playing",
            start: 1100,
            end: 1700,
            size: canvas.width / 17,
            y: canvas.height * 0.6,
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