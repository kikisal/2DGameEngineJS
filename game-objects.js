
// game objects

function Camera(wX, wY, width, ar) {
    this.transform = {
        scaleX: 1,
        scaleY: 1,
        posX: wX,
        posY: wY
    };

    this.wX   = wX;
    this.wY   = wY;
    this.zoom = 1;
    this._zoom(this.zoom);

    this.localX = 0;
    this.localY = 0;

    this.anchorX     = .5;
    this.anchorY     = .5;
    this.aspectRatio = ar;

    this.width        = 0;
    this.height       = 0;
    this.currentWidth = 0;
    this.resize(width, this.aspectRatio);
}

Camera.prototype = {
    update(t) {
        // this.localY         = 10*Math.sin(2*Math.PI * t);
        // this._zoom(map_v(2*Math.sin(2*Math.PI * t), -4, 4, 3, 6));
        

        this.transform.posX = this.transform.scaleX*this.localX + this.wX;
        this.transform.posY = this.transform.scaleY*this.localY + this.wY;
    },

    resize(width, aspect) {
        this.aspectRatio = aspect;

        this.width  = width;
        this.height = this.width / aspect;
    },

    _zoom(z) {
        this.zoom = z;  
        this.transform.scaleX = 1/this.zoom;
        this.transform.scaleY = 1/this.zoom;
    }
};

function Plane(w, h) {
    this.transform  = new Transform(new Vec2(0, 0));
    this.width      = w;
    this.height     = h;
}

Plane.prototype = {
    draw() {
        ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);
    }
}

function Circle(radius) {   
    this.transform = new Transform(new Vec2(0, 0));
    this.radius    = radius;
    this.geometry  = new Geometry();
}

Circle.prototype = {
    draw() {
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, 2*Math.PI, false);
        ctx.fill();
        ctx.closePath();
    }
}

function generateCircle(radius) {  
    return new Circle(radius);
}

function genPlane(width, height) {  
    return new Plane(width, height);
}