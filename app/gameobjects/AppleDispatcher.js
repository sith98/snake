const makeAppleDispatcher = ({gameSpawnApple}) => {
    let apple;
    let specialApple;

    // How long does it take until a special apple disappears
    // if the player does not eat it
    const DESPAWN_TIME = 50;
    // How long until a new special apple appears
    const SPAWN_TIME_MIN = 80;
    const SPAWN_TIME_MAX = 120;

    // how many frames are left until a new special apple spawns
    let spawnCounter = 0;
    // how many frames until the current special apple despawns
    let despawnCounter = 0;

    const init = () => {
        gameSpawnApple();
        scheduleSpecialAppleSpawn();
    }

    // spawns a new apple that is not on an occupied field
    //
    // does not get called directly inside the dispatcher
    // instead the dispatcher calls the game state's spawnApple function
    // the gets asks the snake for the fields it is not on
    // and then calls the dispatcher's spawnApple function with that
    // additional information
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
    
    // All power ups that can spawn
    const specialAppleTypes = [AppleType.LONGER, AppleType.REVERSE, AppleType.FASTER, AppleType.SLOWER]

    // deletes the existing special apple and sets up a new apple to spawn in the future
    const scheduleSpecialAppleSpawn = () => {
        specialApple = undefined
        despawnCounter = 0;
        spawnCounter =
            SPAWN_TIME_MIN + Math.floor(Math.random() * (SPAWN_TIME_MAX - SPAWN_TIME_MIN));
    }

    // chooses a power up by random and creates the new special apple
    const spawnSpecialApple = () => {
        gameSpawnApple(
            specialAppleTypes[Math.floor(Math.random() * specialAppleTypes.length)]
        );
        despawnCounter = DESPAWN_TIME;
    }
    
    // decrements the counters and checks whether or not
    // a new special apple needs to spawn or if the current special apple
    // must despawn
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

    // renders both the normal and the special apple
    // given that either one is present
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

    // gets called by the game state once the player has eaten an apple
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