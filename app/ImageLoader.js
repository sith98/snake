const makeImageLoader = () => {
    const imageKeys = ["apple", "star"];
    const images = {};

    const load = async () => {
        const imagePromises = imageKeys.map(key =>
            new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve({key, img});
                img.onerror = reject;
                img.src = `assets/img/${key}.png`;
            })
        );
        const imgArray = await Promise.all(imagePromises);
        for (const {key, img} of imgArray) {
            images[key] = img;
        }
    }

    const getImage = (key) => images[key];

    return Object.freeze({
        load,
        getImage
    });
}