const makeAppleDispatcher = ({gameSpawnApple}) => {
    let apple;
    let specialApple;

    let spawnCounter = 0;
    let despawnCounter = 0;

    const init = () => {
        gameSpawnApple();
        scheduleSpecialAppleSpawn();
    }

    const spawnApple = (emptyFields, type = AppleType.NORMAL) => {
        const actualEmptyFields = emptyFields.filter(field =>
            (apple === undefined || !apple.pointEquals(field)) &&
            (specialApple === undefined || !apple.pointEquals(field))
        )
        const index = Math.floor(Math.random() * emptyFields.length)
        const {x, y} = emptyFields[index]
        if (type === AppleType.NORMAL) {
            apple = makeApple(x, y, type);
        } else {
            specialApple = makeApple(x, y, type);
        }
    }
    
    const scheduleSpecialAppleSpawn = () => {
        specialApple = undefined
        despawnCounter = 0;
        spawnCounter = 80 + Math.floor(Math.random() * 40);
    }
    const spawnSpecialApple = () => {
        gameSpawnApple(AppleType.LONGER);
        despawnCounter = 50;
    }
    
    const update = () => {
        if (spawnCounter === 0 && specialApple === undefined) {
            spawnSpecialApple()
        }
        if (despawnCounter === 0 && spawnCounter === 0 && spawnApple !== undefined) {
            scheduleSpecialAppleSpawn();
        }
        spawnCounter = Math.max(spawnCounter - 1, 0);
        despawnCounter = Math.max(despawnCounter - 1, 0);
    }

    const draw = (props) => {
        if (apple !== undefined) {
            apple.draw(props)
        }
        if (specialApple !== undefined) {
            specialApple.draw(props)
        }
    }

    const onAppleEaten = (apple) => {
        if (apple.type === AppleType.NORMAL) {
            gameSpawnApple()
        } else {
            specialApple = undefined;
            scheduleSpecialAppleSpawn();
        }
    }
    
    return Object.freeze({
        init,
        update,
        draw,
        onAppleEaten,
        spawnApple,
        get apples() {
            return [apple, specialApple].filter(a => a !== undefined);
        },
    })
}