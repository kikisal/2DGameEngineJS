const canvas = document.createElement('canvas');
const canvasArea = document.createElement('div');
canvasArea.classList.add('canvas-area')
const ctx = canvas.getContext("2d");

const CAMERA_WIDTH = 1080; // Initial camera width  (units of our camera space)
const ASPECT_RATIO = 1080/1920;
const ASSET_URL    = 'http://localhost:3000/assets';
let startingTime = 0;
const timeBox = createTimeBox();

const gfxContext = {
    clearColor: '#b96a6a'
};


const frameBufferSize = [
    1024,
    1024
];

const viewport = [...frameBufferSize];

canvas.width  = frameBufferSize[0];
canvas.height = frameBufferSize[1];

window.addEventListener('resize', () => {
    resizeCanvasArea();
    // camera.resize(window.innerWidth, window.innerWidth / window.innerHeight);
});

const camera = new Camera(
    0, 0, 
    CAMERA_WIDTH, 
    ASPECT_RATIO
);

function draw(obj) {
    const [cX, cY]   = worldToCamera(camera, obj.transform.posX, obj.transform.posY);
    const [vPx, vPy] = to_viewport(cX, cY);

    ctx.save();
    ctx.translate(vPx, vPy);
    ctx.scale(viewport[0]/(camera.width/camera.zoom), viewport[1]/(camera.height/camera.zoom));
    ctx.scale(obj.transform.scaleX, obj.transform.scaleY);
    
    obj.draw();
    ctx.restore();
}

const pot   = CreateObject(Sprite, LoadTexture(`${ASSET_URL}/esteregg.png`));
pot.scale(2);

const duration = 4;

function update(t) {
    pot.transform.posX = (.5*camera.width*camera.transform.scaleX)*t/duration;
    delta        = t - startingTime;

    const [cX, cY] = worldToCamera(camera, pot.transform.posX, pot.transform.posY);
    
    if (Math.abs(cX) > (camera.width * (1 - camera.anchorX)))
        camera.wX = pot.transform.posX;

    timeBox.setDelta(delta);

    camera.update(t);
}

function loop(t) {
    clear();

    const timeSec = t/1000;

    update(timeSec);
    draw(pot);

    timeBox.setTime(timeSec);
    timeBox.setDelta(delta);
    timeBox.update();

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);


canvasArea.appendChild(canvas);

function resizeCanvasArea() {
    canvasArea.style.height = '100%';
    canvasArea.style.width  = ASPECT_RATIO * window.innerHeight + 'px';    
}

resizeCanvasArea();
document.body.appendChild(canvasArea);


function clear() {
    ctx.save();
    ctx.fillStyle = gfxContext.clearColor;
    ctx.fillRect(0, 0, frameBufferSize[0], frameBufferSize[1]);
    ctx.restore();
}