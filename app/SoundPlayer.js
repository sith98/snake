const makeSoundPlayer = () => {
    const soundKeys = ["apple", "death"];
    const sounds = {};

    const context = new AudioContext();

    const load = async () => {
        const promises = soundKeys.map(sound => {
            return new Promise((resolve, reject) => {
                const request = new XMLHttpRequest();
                request.open("GET", `assets/sounds/${sound}.wav`);
                request.responseType = "arraybuffer";
                request.onload = (response) => {
                    context.decodeAudioData(request.response, (buffer) => {
                        resolve({key: sound, buffer});
                    }, reject)
                }
                request.send();
            });
        });

        const bufferList = await Promise.all(promises)
        
        for (const {key, buffer} of bufferList) {
            sounds[key] = {
                buffer,
            }
        }
    }

    const play = (key) => {
        const sound = sounds[key];
        const buffer = sound.buffer;

        const source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);

        source.start(0);
    }

    return Object.freeze({
        load,
        play
    })
}