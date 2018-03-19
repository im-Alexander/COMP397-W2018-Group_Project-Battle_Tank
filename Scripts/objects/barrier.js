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
        function Barrier(assetManager, x, y, hit) {
            if (hit === void 0) { hit = false; }
            var _this = _super.call(this, assetManager, hit ? "barrier_hitted" : "barrier") || this;
            _this.x = x;
            _this.y = y;
            _this.health = 3;
            return _this;
        }
        //Public Methods
        Barrier.prototype.Start = function () {
        };
        Barrier.prototype.Update = function () {
            this.image.id = "tank1";
        };
        return Barrier;
    }(objects.GameObject));
    objects.Barrier = Barrier;
})(objects || (objects = {}));
//# sourceMappingURL=barrier.js.map