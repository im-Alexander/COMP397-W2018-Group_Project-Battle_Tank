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
var scenes;
(function (scenes) {
    var PlayScene = /** @class */ (function (_super) {
        __extends(PlayScene, _super);
        // Public Properties
        // Constructor
        function PlayScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.areaTop = 0;
            _this.areaLeft = 0;
            _this.areaRight = 0;
            _this.areaBottom = 0;
            _this.areaTop = 5;
            _this.areaBottom = 800;
            _this.areaLeft = 5;
            _this.areaRight = 1400;
            _this.Start();
            return _this;
        }
        // Private Mathods
        // Public Methods
        // Initialize Game Variables and objects
        PlayScene.prototype.Start = function () {
            this._terrain = new objects.Terrain(this.assetManager);
            this._tank = new objects.Tank(this.assetManager, (this.areaLeft + this.areaRight) * 0.5, this.areaBottom * 0.9);
            this._enemy = new objects.Enemy(this.assetManager);
            this._bullets = new Array();
            this._labelTankDegree = new objects.Label("Tank Rotation :", "10px", "Arial", "#ff0000", 1400, 10, false);
            this._labelTankX = new objects.Label("Tank X (axis) :", "10px", "Arial", "#ff0000", 1400, 25, false);
            this._labelTankY = new objects.Label("Tank Y (axis) :", "10px", "Arial", "#ff0000", 1400, 40, false);
            this._labelBulletsQty = new objects.Label("Bullets Qty :", "10px", "Arial", "#ff0000", 1400, 55, false);
            this._labelBulletsAnglesList = new objects.Label("Bullets Degree :", "10px", "Arial", "#ff0000", 1400, 70, false);
            this._terrain.setBounds(1, 1, 1230, 830);
            this.Main();
        };
        PlayScene.prototype.Update = function () {
            var _this = this;
            this._terrain.Update();
            this._tank.Update();
            this._labelTankDegree.text = "Tank Rotation : " + this._tank.rotation + "o";
            this._labelTankX.text = "Tank X (axis) :" + this._tank.x;
            this._labelTankY.text = "Tank Y (axis) :" + this._tank.y;
            this._labelBulletsQty.text = "Bullets Qty :" + this._tank.bulletsCounter;
            managers.Collision.Check(this._enemy, this._tank);
            this._tank.nextBulletCounter++;
            if (this._tank.nextBulletCounter > 20) {
                this._tank.bulletsCounter++;
                console.log(this._tank.rotation);
                this._bullets[this._tank.bulletsCounter] = new objects.Bullet(this.assetManager, this._tank.x + this._tank.halfWidth, this._tank.y, this._tank.getAngle(), this.areaLeft, this.areaTop, this.areaRight, this.areaBottom);
                this._labelBulletsAnglesList.text = "Bullets Degree :" + this._tank.getAngle();
                this._tank.nextBulletCounter = 0;
                this.addChild(this._bullets[this._tank.bulletsCounter]);
            }
            var colidedBullets;
            var BulletsArraycounter = 0;
            var counter = 0;
            this._bullets.forEach(function (bullet) {
                bullet.updateCache();
                BulletsArraycounter++;
                if (!bullet.NoColision) {
                    colidedBullets[counter] = BulletsArraycounter;
                }
                managers.Collision.Check(_this._enemy, bullet);
            });
            // if(colidedBullets.length>0){
            //   for(counter =0; counter< colidedBullets.length; counter++){  
            //     this._bullets.slice(colidedBullets[counter],1);
            //   }
            // }
        };
        // This is where the fun happens
        PlayScene.prototype.Main = function () {
            this.addChild(this._terrain);
            // add the tank to the scene
            this.addChild(this._tank);
            this.addChild(this._enemy);
            this.addChild(this._labelTankDegree);
            this.addChild(this._labelTankX);
            this.addChild(this._labelTankY);
            this.addChild(this._labelBulletsQty);
            this.addChild(this._labelBulletsAnglesList);
        };
        return PlayScene;
    }(objects.Scene));
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map