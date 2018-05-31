const Dir = Object.freeze({
    UP: 38, DOWN: 40, LEFT: 37, RIGHT: 39
})

const makeSnake = ({gameWidth, gameHeight, startDir = Dir.RIGHT, startLength = 3}) => {
    // Initialization

    const startX = Math.floor(gameWidth / 2)
    const startY = Math.floor(gameHeight / 2)

    let dir = startDir;
    let nextDir = dir;
    
    let snake = [makePoint(startX, startY)]

    let tailIncrementer = 0;
    
    const init = () => {
        for (let i = 0; i < startLength - 1; i++) {
            addHead()
        }
    }
    
    // Game logic

    const addHead = () => {
        if (
            nextDir === Dir.DOWN && dir !== Dir.UP ||
            nextDir === Dir.UP && dir !== Dir.DOWN ||
            nextDir === Dir.LEFT && dir !== Dir.RIGHT ||
            nextDir === Dir.RIGHT && dir !== Dir.LEFT
        ) {
            dir = nextDir;
        }
            
        const {x, y} = snake[0];
        switch (dir) {
            case Dir.UP:
                return snake.unshift(makePoint(x, y - 1))
            case Dir.DOWN:
                return snake.unshift(makePoint(x, y + 1))
            case Dir.LEFT:
                return snake.unshift(makePoint(x - 1, y))
            case Dir.RIGHT:
                return snake.unshift(makePoint(x + 1, y))
        }
    }
    
    const removeTail = () => {
        snake.pop();
    }

    const update = (apples, gameOnAppleEaten, onSnakeDead) => {
        addHead();
        
        const [head, ...rest] = snake;
        
        // Game over
        
        const outOfBounds = (
            head.x < 0 || head.y < 0 ||
            head.x >= gameWidth || head.y >= gameHeight
        );
        const collidedWithItself = rest.some(head.equals);
        
        if (outOfBounds || collidedWithItself) {
            onSnakeDead();
        }
        
        // Apple
        for (const apple of apples) {
            if (apple.pointEquals(head)) {
                gameOnAppleEaten(apple);
            }
        }

        if (tailIncrementer === 0) {
            removeTail();
        } else {
            tailIncrementer -= 1;
        }
        
    }

    const getEmptyFields = () => {
        const snakeLookUp = new Array(gameWidth * gameHeight);
        for (const {x, y} of snake) {
            snakeLookUp[x + y * gameWidth] = true;
        }
        const fields = [];
        for (let x = 0; x < gameWidth; x++) {
            for (let y = 0; y < gameHeight; y++) {
                if (snakeLookUp[x + y * gameHeight] !== true) {
                    const field = makePoint(x, y);
                    fields.push(field);
                }
            }
        }

        return fields;
    }


    // Events
    const onKeyDown = ({keyCode}) => {
        nextDir = keyCode;
    }

    const onAppleEaten = (apple) => {
        switch (apple.type) {
            case AppleType.NORMAL:
                tailIncrementer = 1;
                break;
            case AppleType.LONGER:
                tailIncrementer = 5;
                break;
            case AppleType.REVERSE:
                tailIncrementer = 1;
                reverseSnake();
        }
    }

    const reverseSnake = () => {
        snake.reverse();
        let [head, second] = snake;
        if (head.x < second.x) {
            dir = Dir.LEFT;
        } else if (head.x > second.x) {
            dir = Dir.RIGHT;
        } else if (head.y < second.y) {
            dir = Dir.UP;
        } else if (head.y > second.y) {
            dir = Dir.DOWN;
        }
        nextDir = dir;
    }
    
    // Drawing

    const startColor = {
        red: 50,
        green: 255,
        blue: 50
    }
    const endColor = {
        red: 0,
        green: 100,
        blue: 0,
    }
    
    const interpolateColor = (factor, color) =>
        Math.floor(interpolate(factor, -1, 1, startColor[color], endColor[color]))    

    const draw = ({ctx, gridSize}) => {
        for (const [index, point] of snake.entries()) {
            const factor = -Math.cos(index * Math.PI / 5)

            const red = interpolateColor(factor, "red");
            const green = interpolateColor(factor, "green");
            const blue = interpolateColor(factor, "blue");

            const color = `rgb(${red}, ${green}, ${blue}`;

            point.draw({ctx, gridSize, color});
        }
    }

    
    init()
    
    return Object.freeze({
        draw,
        update,
        getEmptyFields,
        onKeyDown,
        onAppleEaten,
    })
}