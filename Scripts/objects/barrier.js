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
    var Barrier = /** @class */ (function (_super) {
        __extends(Barrier, _super);
        // Constructor
        function Barrier(assetManager, barrier_type, x, y, destructiblet) {
            if (destructiblet === void 0) { destructiblet = true; }
            var _this = _super.call(this, assetManager, barrier_type) || this;
            _this.x = x;
            _this.y = y;
            _this.health = 3;
            _this.barrier_type = barrier_type;
            _this.name = "barrier";
            _this.destructible = destructiblet;
            return _this;
        }
        //Public Methods
        Barrier.prototype.Start = function () {
        };
        Barrier.prototype.Update = function () {
            if (this.health == 2) {
                this.image = new createjs.Bitmap("./assets/images/barriers/brick_big_2.png").image;
            }
            else if (this.health == 1) {
                this.image = new createjs.Bitmap("./assets/images/barriers/brick_big_3.png").image;
            }
            else if (this.health <= 0) {
                this.x = -100;
                this.y = -100;
                this.visible = false;
            }
        };
        Barrier.prototype.decreaseHealth = function (damage) {
            if (damage === void 0) { damage = 1; }
            if (this.destructible)
                this.health -= damage;
        };
        return Barrier;
    }(objects.GameObject));
    objects.Barrier = Barrier;
})(objects || (objects = {}));
//# sourceMappingURL=barrier.js.map