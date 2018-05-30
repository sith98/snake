const makeAppleDispatcher = () => {
    let apple;

    const spawnApple = (emptyFields) => {
        const index = Math.floor(Math.random() * emptyFields.length)
        const {x, y} = emptyFields[index]
        apple = makeApple(x, y)
    }
    
    return Object.freeze({
        spawnApple,
        get apple() { return apple }
    })
}