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
            
        const {x, y} = getHead();
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
    
    const getHead = () => snake[0];
    
    const removeTail = () => {
        snake.pop();
    }
    
    // PUBLIC
    const update = (apple, boardWidth, boardHeight, onAppleEaten, onSnakeDead) => {
        addHead()
        
        const head = getHead();
        
        // Game over
        
        const outOfBounds = (
            head.x < 0 || head.y < 0 ||
            head.x >= boardWidth || head.y >= boardHeight
        );
        const collidedWithItself = snake.slice(1)
            .some(head.equals);
        
        if (outOfBounds || collidedWithItself) {
            onSnakeDead()
        }
        
        // Apple        
        if (apple.equals(head)) {
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