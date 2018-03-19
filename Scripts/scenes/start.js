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
    var StartScene = /** @class */ (function (_super) {
        __extends(StartScene, _super);
        // Public Properties
        // Constructor
        function StartScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        StartScene.prototype._startButtonClick = function () {
            objects.Game.currentScene = config.Scene.PLAY1;
        };
        // Public Methods
        // Initialize Game Variables and objects
        StartScene.prototype.Start = function () {
            this._welcomeLabel = new objects.Label("- Tank Game - ", "80px", "Consolas", "#FFFFFF", 750, 250, true);
            this._welcomeLabel2 = new objects.Label("- Alpha Version Presentation -", "40px", "Consolas", "#FFFFFF", 750, 350, true);
            this._startButton = new objects.Button(this.assetManager, "startButton", 750, 450);
            this._terrain1 = new objects.Terrain(this.assetManager, "terrain1");
            this._terrain2 = new objects.Terrain(this.assetManager, "terrain1");
            this._terrain3 = new objects.Terrain(this.assetManager, "terrain1");
            this._terrain4 = new objects.Terrain(this.assetManager, "terrain1");
            this._terrain1.x = 0;
            this._terrain1.y = 0;
            this._terrain2.x = this._terrain1.getBounds().width;
            this._terrain2.y = 0;
            this._terrain3.x = 0;
            this._terrain3.y = this._terrain1.getBounds().height;
            this._terrain4.x = this._terrain3.getBounds().width;
            this._terrain4.y = this._terrain1.getBounds().height;
            this._labyrinth = new Array();
            this.setLabyrinth2();
            //Players
            this._newTank1 = new objects.NewTank(this.assetManager, 1, 750, 5, 2);
            this._newTank2 = new objects.NewTank(this.assetManager, 1, 750, 820, 2);
            this._newTank3 = new objects.NewTank(this.assetManager, 2, 1, 399, 2);
            this._newTank4 = new objects.NewTank(this.assetManager, 2, 1470, 401, 2);
            this._powerup1 = new objects.PowerUp(this.assetManager);
            this._powerup2 = new objects.PowerUp(this.assetManager);
            this.Main();
        };
        StartScene.prototype.Update = function () {
            this._newTank1.MoveAutomatically();
            this._newTank2.MoveAutomatically();
            this._newTank3.MoveAutomatically();
            this._newTank4.MoveAutomatically();
        };
        // This is where the fun happens
        StartScene.prototype.Main = function () {
            var _this = this;
            this.addChild(this._terrain1);
            this.addChild(this._terrain2);
            this.addChild(this._terrain3);
            this.addChild(this._terrain4);
            this._labyrinth.forEach(function (barrier) {
                _this.addChild(barrier);
            });
            // Add each bullet on the screen
            this._newTank1._bullets.forEach(function (bullet) {
                _this.addChild(bullet);
            });
            this._newTank2._bullets.forEach(function (bullet) {
                _this.addChild(bullet);
            });
            this.addChild(this._powerup1);
            this.addChild(this._powerup2);
            // add the tank to the scene
            this.addChild(this._newTank1);
            this.addChild(this._newTank2);
            this.addChild(this._newTank3);
            this.addChild(this._newTank4);
            // add the welcome label to the scene
            this.addChild(this._welcomeLabel);
            this.addChild(this._welcomeLabel2);
            // add the startButton to the scene
            this.addChild(this._startButton);
            this._startButton.on("click", this._startButtonClick);
        };
        StartScene.prototype.setLabyrinth2 = function (tp) {
            if (tp === void 0) { tp = 1; }
            var labirinth_total_horizontal_tiles = 46;
            var labirinth_total_vertica_tiles = 25;
            var tile_width = 30;
            var tile_height = 30;
            var labyrinth = new Array();
            //                       1         2         3         4
            //              123456789012345678901234567890123456789012345678
            labyrinth.push(" ");
            labyrinth.push(" ");
            labyrinth.push("  11111   11111  11 11  11111  11111  11111  11111");
            labyrinth.push("  1       1   1  1 1 1  1   1      1  1   1  1     ");
            labyrinth.push("  1       1   1  1   1  11111  11111  11111  11111");
            labyrinth.push("  1       1   1  1   1  1          1      1      1");
            labyrinth.push("  11111   11111  1   1  1      11111  11111  11111");
            labyrinth.push("");
            labyrinth.push("");
            labyrinth.push("  1     1  111111  11111  11111  1  11111  11111  ");
            labyrinth.push("  1     1  1    1  1   1  1   1  1  1   1  1   1  ");
            labyrinth.push("  1  1  1  111111  11111  11111  1  1   1  11111  ");
            labyrinth.push("  1 111 1  1    1  1  1   1  1   1  1   1  1  1   ");
            labyrinth.push("  1111111  1    1  1   1  1   1  1  11111  1   1  ");
            labyrinth.push(" ");
            labyrinth.push("    1111111  1111111  1111111  1        1111111   ");
            labyrinth.push("    1        1     1  1        1        1         ");
            labyrinth.push("    1111111  1111111  1  1111  1        1111111   ");
            labyrinth.push("    1        1     1  1     1  1        1         ");
            labyrinth.push("    1111111  1     1  1111111  1111111  1111111   ");
            labyrinth.push(" ");
            labyrinth.push("       11111  1   1  1      11111  11111   11  ");
            labyrinth.push("       1   1  1   1  1      1      1       11  ");
            labyrinth.push("       11111  1   1  1      11111  11111   11  ");
            labyrinth.push("       1  1   1   1  1      1          1       ");
            labyrinth.push("       1   1  11111  11111  11111  11111   11  ");
            //              123456789012345678901234567890123456789012345678
        };
        return StartScene;
    }(objects.Scene));
    scenes.StartScene = StartScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=start.js.map