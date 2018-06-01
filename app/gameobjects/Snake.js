const Dir = Object.freeze({
    UP: 38, DOWN: 40, LEFT: 37, RIGHT: 39
})

const makeSnake = ({gameWidth, gameHeight, startDir = Dir.RIGHT, startLength = 3}) => {
    // Initialization

    const startX = Math.floor(gameWidth / 2)
    const startY = Math.floor(gameHeight / 2)

    let dir = startDir;
    
    // gets set in the keydown handler
    // the actual direction only gets updated in the update function
    // this way in can be ensured the snake will not go the opposite way
    // if the player sets the direction twice in one frame
    // (e.g. from LEFT to UP and then RIGHT)
    let nextDir = dir;
    
    let snake = [makePoint(startX, startY)]

    // gets set to a value higher than zero when an apple has been eaten
    // the snake will get longer that many fields
    // by not removing the tail for that many frames
    let tailIncrementer = 0;
    
    // add fields until desired initial length is reached
    const init = () => {
        for (let i = 0; i < startLength - 1; i++) {
            addHead()
        }
    }
    
    // Game logic

    const addHead = () => {
        // the player is not allowed to go the oppsite way
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
                snake.unshift(makePoint(x, y - 1));
                break;
            case Dir.DOWN:
                snake.unshift(makePoint(x, y + 1));
                break;
            case Dir.LEFT:
                snake.unshift(makePoint(x - 1, y));
                break;
            case Dir.RIGHT:
                snake.unshift(makePoint(x + 1, y));
                break;
        }
    }
    
    const removeTail = () => {
        snake.pop();
    }

    const update = ({apples, gameOnAppleEaten, onSnakeDead}) => {
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

    // returns an array of points that represent all fields the snake is not on
    const getEmptyFields = () => {
        // by first storing all snake fields in a lookup table 
        // checking if a fields is occupied by the snake can be done
        // in constant time instead of linear time
        const snakeLookUp = new Array(gameWidth * gameHeight);
        for (const {x, y} of snake) {
            snakeLookUp[x + y * gameWidth] = true;
        }
        
        const fields = [];
        for (let x = 0; x < gameWidth; x++) {
            for (let y = 0; y < gameHeight; y++) {
                if (snakeLookUp[x + y * gameWidth] !== true) {
                    fields.push(makePoint(x, y));
                }
            }
        }

        return fields;
    }


    // Events
    const onKeyDown = ({keyCode}) => {
        nextDir = keyCode;
    }

    // handles the effects of different apples on the snake
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

    // reverses the snake array and calculates the new look directino
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

    // the two ends of the snake's color range
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
    
    // does an interpolation of cosine values (between -1 and 1)
    // to a color value determined by "startColor" and "endColor"
    const interpolateColor = (factor, color) =>
        Math.floor(interpolate(factor, -1, 1, startColor[color], endColor[color]));  

    // the snake's color pattern is calculated by putting each index
    // through the cosine function    
    const draw = ({ctx, gridSize}) => {
        for (const [index, point] of snake.entries()) {
            const factor = -Math.cos(index * Math.PI / 5)

            const red = interpolateColor(factor, "red");
            const green = interpolateColor(factor, "green");
            const blue = interpolateColor(factor, "blue");

            const color = `rgb(${red}, ${green}, ${blue}`;

            ctx.fillStyle = color;
            ctx.fillRect(point.x * gridSize, point.y * gridSize, gridSize, gridSize);
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