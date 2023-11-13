function worldToCamera(camera, wX, wY) {
    return [
      (wX - camera.transform.posX) / camera.transform.scaleX,
      (wY - camera.transform.posY) / camera.transform.scaleY
    ];
}

function worldToCameraVec(camera, wX, wY) {
    return [
        wX / camera.transform.scaleX,
        wY / camera.transform.scaleY
      ];
}


function cameraToNDC(camera, cX, cY) {
    const lP =  -camera.width * camera.anchorX;
    const rP =  camera.width * (1 - camera.anchorX);
    const tP =  camera.height * camera.anchorY;
    const bP =  camera.height * (camera.anchorY - 1);

    return [
        map_v(cX, lP, rP, -1, 1),
        map_v(cY, tP, bP,  1, -1)
    ];
}

function ndcToViewport(ndcX, ndcY, viewport) {
    return [
        (0.5*ndcX + 0.5) * viewport[0],
        (0.5*ndcY + 0.5) * viewport[1],
    ];
}

function map_v(x, x0, x1, y0, y1) {
    return ((y1-y0)/(x1-x0))*(x-x0) + y0;
}

function localToWorld(x, y, transform) {
    return [
        transform.scaleX * x + transform.posX,
        transform.scaleY * y + transform.posY,
    ];
}

function localToWorldVec(x, y, transform) {
    return [
        transform.scaleX * x,
        transform.scaleY * y
    ];
}

function to_viewport(cX, cY) {
    const [ndcX, ndcY] = cameraToNDC(camera, cX, cY);
    return ndcToViewport(ndcX, ndcY, viewport);
}

function Geometry() {
    this.vertices = [];

    this.addVertex = function(x, y) {
        this.vertices.push([x, y]);
    };
}

function Vec2(x, y) {
    this.x = x;
    this.y = y;
}

Vec2.prototype = {

};

function Transform(pos) {
    this.scaleX = 1;
    this.scaleY = 1;
    this.posX   = pos.x;
    this.posY   = pos.y;
}
