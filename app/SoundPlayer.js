const makeSoundPlayer = () => {
    const soundKeys = ["apple", "death", "powerup", "highscore"];
    const sounds = {};

    const context = new AudioContext();

    const load = async () => {
        const promises = soundKeys.map(async sound => {
            const response = await fetch(`assets/sounds/${sound}.wav`);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await context.decodeAudioData(arrayBuffer);
            return {key: sound, buffer: audioBuffer}
        });

        const bufferList = await Promise.all(promises)
        
        for (const {key, buffer} of bufferList) {
            sounds[key] = { buffer }
        }
    }

    const play = (key, {delay = 0, loop = false} = {}) => {
        const sound = sounds[key];
        const buffer = sound.buffer;

        const source = context.createBufferSource();
        source.loop = loop;
        source.buffer = buffer;
        source.connect(context.destination);

        source.start(context.currentTime + delay);
        sound.source = source;
    }
    const stop = (key, {delay = 0} = {}) => {
        const { source } = sounds[key];
        if (source !== undefined) {
            source.stop(context.currentTime + delay);
        }
    }

    return Object.freeze({
        load,
        play,
        stop
    })
}