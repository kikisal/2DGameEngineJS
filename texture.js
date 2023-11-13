function Texture() {
    this.image    = null;
    this.width    = 0;
    this.height   = 0;
    this.loaded   = false;
    this.listener = null;
    this.url      = null;
}

Texture.prototype = {
    onLoad(listener) {
        if (this.image)
            listener.onTextureLoaded();

        this.listener = listener;
    },

    async load(blob) {
        try {
            this.image = await createImageBitmap(blob);

            this.loaded = true;
            this.width   = this.image.width;
            this.height  = this.image.height;
        } catch (ex) {
            if (Engine.DEBUG_ENABLED)
                console.log('failed to load image: ', this.url);
        }
        if (this.listener)
            this.listener.onTextureLoaded(this);
    }
}

Texture.fromURL = function(url) {
    const texture = new Texture();
    texture.url = url;

    const blobImg = fetchBlob(url);
    
    blobImg.then(async img => {
        await texture.load(img);
    });

    return texture;
};

function fetchBlob(url) {
    return new Promise((res, rej) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.onload = (e) => {
            res(e.target.response);
        };
        xhr.send();
    });
}

function LoadTexture(url) {
    return Texture.fromURL(url);
}