/* The snake in the game */
const Dir = Object.freeze({
    UP: 38, DOWN: 40, LEFT: 37, RIGHT: 39
})

const makeSnake = (startX, startY, startDir = Dir.RIGHT, startLength = 3) => {
    // PRIVATE
    let dir = startDir;
    let lastDir = dir;
    
    let snake = [makePoint(startX, startY)]
    
    const init = () => {
        for (let i = 0; i < startLength - 1; i++) {
            addHead()
        }
    }
    
    const addHead = () => {
        if (
            lastDir === Dir.DOWN && dir !== Dir.UP ||
            lastDir === Dir.UP && dir !== Dir.DOWN ||
            lastDir === Dir.LEFT && dir !== Dir.RIGHT ||
            lastDir === Dir.RIGHT && dir !== Dir.LEFT
        ) {
            dir = lastDir;
        }
            
        const {x, y} = snake[snake.length - 1];
        switch (dir) {
            case Dir.UP:
                return snake.push(makePoint(x, y - 1))
            case Dir.DOWN:
                return snake.push(makePoint(x, y + 1))
            case Dir.LEFT:
                return snake.push(makePoint(x - 1, y))
            case Dir.RIGHT:
                return snake.push(makePoint(x + 1, y))
        }
    }
    
    const removeTail = () => {
        snake.shift();
    }
    
    // PUBLIC
    const update = (apple, onAppleEaten) => {
        addHead()
        
        const head = snake[snake.length - 1];
        const coor = apple.getPoint()
        
        if (head.x === coor.x && head.y === coor.y) {
            onAppleEaten()
        } else {
            removeTail()
        }
        
    }
    
    const draw = (ctx, gridSize) => {
        for (const point of snake) {
            drawPoint({ctx, gridSize, point, color: "green"})
        }
    }
    
    const onKeyDown = ({keyCode}) => {
        lastDir = keyCode;
    }
    
    init()
    
    return {
        draw,
        update,
        onKeyDown
    }
}