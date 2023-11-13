const canvas = document.createElement('canvas');
const ctx    = canvas.getContext("2d");

const CAMERA_WIDTH = window.innerWidth; // Initial camera width  (units of our camera space)
let startingTime = 0;
const timeBox = createTimeBox();

const gfxContext = {
    clearColor: '#fff'
};

const frameBufferSize = [
    1024,
    1024
];

const viewport = [...frameBufferSize];

canvas.width  = frameBufferSize[0];
canvas.height = frameBufferSize[1];

window.addEventListener('resize', () => {
    camera.resize(window.innerWidth, window.innerWidth / window.innerHeight);
});

const camera = new Camera(0, 0, CAMERA_WIDTH, window.innerWidth/window.innerHeight);

function draw(obj) {
    const [cX, cY]   = worldToCamera(camera, obj.transform.posX, obj.transform.posY);
    const [vPx, vPy] = to_viewport(cX, cY);

    ctx.save();
    ctx.translate(vPx, vPy);
    ctx.scale(viewport[0]/(camera.width/camera.zoom), viewport[1]/(camera.height/camera.zoom));
    obj.draw();
    ctx.restore();
}

const c        = generateCircle(20);

const duration = 4;

function update(t) {
    c.transform.posX = (.5*camera.width*camera.transform.scaleX)*t/duration;
    delta        = t - startingTime;

    const [cX, cY] = worldToCamera(camera, c.transform.posX, c.transform.posY);
    
    if (Math.abs(cX) > (camera.width * (1-camera.anchorX))) {
        camera.wX = c.transform.posX;
    }



    timeBox.setDelta(delta);

    camera.update(t);
}

function loop(t) {
    clear();

    const timeSec = t/1000;

    update(timeSec);
    draw(c);

    timeBox.setTime(timeSec);
    timeBox.setDelta(delta);
    timeBox.update();

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);


document.body.appendChild(canvas);


function clear() {
    ctx.save();
    ctx.fillStyle = gfxContext.clearColor;
    ctx.fillRect(0, 0, frameBufferSize[0], frameBufferSize[1]);
    ctx.restore();
}