const makeAppleDispatcher = ({gameSpawnApple}) => {
    let apple;
    let specialApple;

    const DESPAWN_TIME = 50;
    const SPAWN_TIME_MIN = 80;
    const SPAWN_TIME_MAX = 120;

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
        const index = Math.floor(Math.random() * actualEmptyFields.length)
        const {x, y} = actualEmptyFields[index]
        if (type === AppleType.NORMAL) {
            apple = makeApple(x, y, type);
        } else {
            specialApple = makeApple(x, y, type);
        }
    }
    
    const specialAppleTypes = [AppleType.LONGER, AppleType.REVERSE, AppleType.FASTER, AppleType.SLOWER]
    const scheduleSpecialAppleSpawn = () => {
        specialApple = undefined
        despawnCounter = 0;
        spawnCounter =
            SPAWN_TIME_MIN + Math.floor(Math.random() * (SPAWN_TIME_MAX - SPAWN_TIME_MIN));
    }
    const spawnSpecialApple = () => {
        gameSpawnApple(
            specialAppleTypes[Math.floor(Math.random() * specialAppleTypes.length)]
        );
        despawnCounter = DESPAWN_TIME;
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
            // Blinks after half of despawn time is over
            if (despawnCounter >= DESPAWN_TIME / 2 || despawnCounter % 4 <= 1) {
                specialApple.draw(props)
            }
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