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
    var StatusHealth = /** @class */ (function (_super) {
        __extends(StatusHealth, _super);
        // Constructor
        function StatusHealth(assetManager, x, y, direction) {
            if (direction === void 0) { direction = "down"; }
            var _this = _super.call(this, assetManager, "status_health") || this;
            // Private Instance Variables
            _this.updateRate = 20;
            _this.angle = 0;
            _this.xCartesianActual = 0; // register the actual x vector o the line in cartesian plan
            _this.yCartesianActual = 0; // register the actual x vector o the line in cartesian plan
            // Public Properties
            _this.isFired = false;
            //Difining the object position on screen
            _this.x = x;
            _this.y = y;
            _this.tank_direction = direction;
            return _this;
        }
        // Public Methods
        StatusHealth.prototype.updateCache = function () {
        };
        StatusHealth.prototype.positioning = function (x, y, direction) {
            if (direction == "down") {
                this.x = x;
                this.y = y - 2;
            }
            else if (direction == "up") {
                this.x = x;
                this.y = y + 2;
            }
            else if (direction == "left") {
                this.x = x;
                this.y = y - 2;
            }
            else { // right
                this.x = x;
                this.y = y - 2;
            }
        };
        StatusHealth.prototype.move = function () {
        };
        StatusHealth.prototype.CheckBounds = function () {
        };
        return StatusHealth;
    }(objects.GameObject));
    objects.StatusHealth = StatusHealth;
})(objects || (objects = {}));
//# sourceMappingURL=statushealth.js.map