var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var objects;
(function (objects) {
    var Bullet = /** @class */ (function (_super) {
        __extends(Bullet, _super);
        // Public Properties
        // Constructor
        function Bullet(assetManager, x, y, angle, canvasTop, canvasLeft, canvasWidth, canvasHeight) {
            var _this = _super.call(this, assetManager, "bullet") || this;
            // Private Instance Variables
            _this.updateRate = 20;
            _this.angle = 0;
            _this.xCartesianActual = 0; // register the actual x vector o the line in cartesian plan
            _this.yCartesianActual = 0; // register the actual x vector o the line in cartesian plan
            //Difining the object position on screen
            _this.x = x - _this.getBounds().width * 0.5;
            _this.y = y - _this.getBounds().height * 0.5;
            // The angle of the line  on screen
            _this.angle = angle;
            _this.xCartesianActual = x;
            _this.yCartesianActual = y;
            _this.canvasLeft = canvasLeft;
            _this.canvasTop = canvasTop;
            _this.canvasWidth = canvasWidth;
            _this.canvasHeight = canvasHeight;
            return _this;
        }
        // Public Methods
        Bullet.prototype.updateCache = function () {
            this.move();
        };
        Bullet.prototype.move = function () {
            this.x = this.nextCartesianX() - this.getBounds().width * 0.5;
            this.y = this.nextCartesianY() - this.getBounds().height * 0.5;
            this.CheckBounds();
        };
        // converts to Radians (the math functions cos() and sin() need an radian angle)
        Bullet.prototype.radians = function (_angle) {
            var m = this.absoluteAngle(_angle) / 180 * Math.PI;
            return this.absoluteAngle(_angle) / 180 * Math.PI;
        };
        // Converts angles with high values (above 360) 
        // to the range between 0 and 360
        Bullet.prototype.absoluteAngle = function (_angle) {
            return _angle % 360; // Checks the final angle  
        };
        // Checks which quadrant in a circle the referred angle belongs to
        // counter-clockwise
        Bullet.prototype.quadrant = function (_angle) {
            var absolute = this.absoluteAngle(_angle);
            if (this.absoluteAngle(_angle) > 270)
                return 4;
            if (this.absoluteAngle(_angle) > 180)
                return 3;
            if (this.absoluteAngle(_angle) > 90)
                return 2;
            return 1;
        };
        // Based on the new x-axis value y-axis is recalculated
        Bullet.prototype.nextCartesianY = function () {
            this.nextCartesianX();
            this.yCartesianActual -= this.updateRate * Math.sin(this.radians(this.angle));
            return this.yCartesianActual;
        };
        Bullet.prototype.nextCartesianX = function () {
            this.xCartesianActual += this.updateRate * Math.cos(this.radians(this.angle));
            return this.xCartesianActual;
        };
        Bullet.prototype.NoColision = function () {
            return !(this.xCartesianActual + this.getBounds().width > this.canvasWidth + this.canvasLeft ||
                this.xCartesianActual + this.getBounds().width < this.canvasLeft ||
                this.yCartesianActual + this.getBounds().height > this.canvasTop + this.canvasHeight ||
                this.yCartesianActual + this.getBounds().height < this.canvasTop);
        };
        Bullet.prototype.CheckBounds = function () {
            // right boundary
            if (this.x >= 1500 - this.halfWidth) {
                this.x = 1500 - this.halfWidth;
            }
            // left boundary
            if (this.x <= this.halfWidth) {
                this.x = this.halfWidth;
            }
            // bottom boundary
            if (this.y >= 800 - this.halfHeight) {
                this.y = 800 - this.halfHeight;
            }
            // top boundary
            if (this.y <= this.halfHeight) {
                this.y = this.halfHeight;
            }
        };
        return Bullet;
    }(objects.GameObject));
    objects.Bullet = Bullet;
})(objects || (objects = {}));
//# sourceMappingURL=bullet.js.map