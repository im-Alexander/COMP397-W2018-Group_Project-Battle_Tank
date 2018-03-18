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
    var PlayScene3 = /** @class */ (function (_super) {
        __extends(PlayScene3, _super);
        // Constructor
        function PlayScene3(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        // Public Methods
        // Initialize Game Variables and objects
        PlayScene3.prototype.Start = function () {
            // Terrain to cover the canvas (It is temporally)
            this._terrain1 = new objects.Terrain(this.assetManager);
            this._terrain2 = new objects.Terrain(this.assetManager);
            this._terrain3 = new objects.Terrain(this.assetManager);
            this._terrain4 = new objects.Terrain(this.assetManager);
            this._terrain1.x = 0;
            this._terrain1.y = 0;
            this._terrain2.x = this._terrain1.getBounds().width;
            this._terrain2.y = 0;
            this._terrain3.x = 0;
            this._terrain3.y = this._terrain1.getBounds().height;
            this._terrain4.x = this._terrain3.getBounds().width;
            this._terrain4.y = this._terrain1.getBounds().height;
            this._labyrinth = new Array();
            this.setLabyrinth2(3);
            //Players
            this._newTank1 = new objects.NewTank(this.assetManager, 1, 770, 5, 2);
            this._newTank2 = new objects.NewTank(this.assetManager, 2, 770, 820, 2);
            this._powerup1 = new objects.PowerUp(this.assetManager);
            this._powerup2 = new objects.PowerUp(this.assetManager);
            // create scoreboard UI for scene
            this._scoreBoard = new managers.ScoreBoard();
            var objectsMap = new Array();
            objectsMap.push(this._newTank1);
            objectsMap.push(this._newTank2);
            objectsMap.push(this._powerup1);
            objectsMap.push(this._powerup2);
            this._labyrinth.forEach(function (barrier) {
                objectsMap.push(barrier);
            });
            objects.Game.objectsMap = objectsMap;
            this._scoreBoard.setFuel(this._newTank1.fuel, this._newTank2.fuel);
            this._scoreBoard.setHealth(this._newTank1.health, this._newTank2.health);
            this._scoreBoard.setScore(this._newTank1.score, this._newTank2.score);
            this.Main();
        };
        PlayScene3.prototype.Update = function () {
            this._newTank1.UpdateTank();
            this._newTank2.UpdateTank();
            this._powerup1.Update();
            this._powerup2.Update();
            this._scoreBoard.setFuel(this._newTank1.fuel, this._newTank2.fuel);
            this._scoreBoard.setHealth(this._newTank1.health, this._newTank2.health);
            this._scoreBoard.setScore(this._newTank1.score, this._newTank2.score);
            // If lives fall below 0 swith to game over scene
            if (this._newTank1.health <= 0 || this._newTank2.health <= 0) {
                objects.Game.currentScene = config.Scene.OVER;
            }
        };
        // This is where the fun happens
        PlayScene3.prototype.Main = function () {
            var _this = this;
            this.addChild(this._terrain1);
            this.addChild(this._terrain2);
            this.addChild(this._terrain3);
            this.addChild(this._terrain4);
            this._labyrinth.forEach(function (barrier) {
                _this.addChild(barrier);
            });
            // add scoreboard labels to the scene
            this.addChild(this._scoreBoard._player1_HealthLabel);
            this.addChild(this._scoreBoard._player1_ScoreLabel);
            this.addChild(this._scoreBoard._player1_FuelLabel);
            this.addChild(this._scoreBoard._player2_HealthLabel);
            this.addChild(this._scoreBoard._player2_ScoreLabel);
            this.addChild(this._scoreBoard._player2_FuelLabel);
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
        };
        PlayScene3.prototype.setLabyrinth = function (tp) {
            if (tp === void 0) { tp = 1; }
            var barrier = new objects.Barrier(this.assetManager, -100, -100);
            var width = barrier.getBounds().width;
            var height = barrier.getBounds().height;
            var next_x = width;
            var next_y = 90;
            this._labyrinth.push(new objects.Barrier(this.assetManager, 80, next_y));
            this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
            this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
            this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
            this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
            this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
            this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
            this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
            this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
            this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
            this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
            this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
            this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
            this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += (width * 3), next_y));
            this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
            this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
            this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
            this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
            this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
            this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
            this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
            this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
            this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
            this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
            this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
            this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
            this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
            this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
            this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
            var c = 0;
            for (c = 1; c < 10; c++) {
                next_y += 120;
                next_x = 70;
                this._labyrinth.push(new objects.Barrier(this.assetManager, 80, next_y));
                this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
                this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
                this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
                this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
                this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
                this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
                this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
                this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
                this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
                this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
                this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
                this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
                this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += (width * 3), next_y));
                this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
                this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
                this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
                this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
                this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
                this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
                this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
                this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
                this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
                this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
                this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
                this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
                this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
                this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
                this._labyrinth.push(new objects.Barrier(this.assetManager, next_x += width, next_y));
            }
        };
        PlayScene3.prototype.setLabyrinth2 = function (tp) {
            var _this = this;
            if (tp === void 0) { tp = 1; }
            var labirinth_total_horizontal_tiles = 46;
            var labirinth_total_vertica_tiles = 25;
            var tile_width = 30;
            var tile_height = 30;
            var labyrinth = new Array();
            switch (tp) {
                case 1:
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
                    //                       1         2         3         4
                    break;
                case 2:
                    //                       1         2         3         4
                    //              123456789012345678901234567890123456789012345678
                    labyrinth.push(" ");
                    labyrinth.push(" ");
                    labyrinth.push("        111111111  111111111  1111 1111           ");
                    labyrinth.push("            11     11     11  11 111 11           ");
                    labyrinth.push("  111111    11     11     11  11  1  11  1111111  ");
                    labyrinth.push("  111111    11     11     11  11     11  1111111  ");
                    labyrinth.push("            11     111111111  11     11           ");
                    labyrinth.push("");
                    labyrinth.push("");
                    labyrinth.push("     111111  111111    111111  11  11  111111     ");
                    labyrinth.push("       11    11          11    11  11  1          ");
                    labyrinth.push("       11    111111      11    111111  111111     ");
                    labyrinth.push("       11        11      11    11  11  1          ");
                    labyrinth.push("     111111  111111      11    11  11  111111     ");
                    labyrinth.push("");
                    labyrinth.push(" ");
                    labyrinth.push("    1111111111   11       11  111       111   111 ");
                    labyrinth.push("    11           11       11   11       11    111 ");
                    labyrinth.push("    11  1111111  11       11   11111111111    111 ");
                    labyrinth.push("    11       11  11       11        11            ");
                    labyrinth.push("    11111111111  11111111111        11        111 ");
                    labyrinth.push(" ");
                    labyrinth.push("  1111111111111111111111111111111111111111111111  ");
                    labyrinth.push(" ");
                    labyrinth.push(" ");
                    labyrinth.push("111111111111111111111      11111111111111111111111");
                    //              123456789012345678901234567890123456789012345678
                    //                       1         2         3         4
                    break;
                case 3:
                    //                       1         2         3         4
                    //              123456789012345678901234567890123456789012345678
                    labyrinth.push(" ");
                    labyrinth.push(" ");
                    labyrinth.push("         1111           1111  1111111111         ");
                    labyrinth.push("         1111           1111  1111               ");
                    labyrinth.push("  1111   1111           1111  1111111111  1111   ");
                    labyrinth.push("         1111    111    1111  1111               ");
                    labyrinth.push("          1111   111   1111   1111               ");
                    labyrinth.push("            1111111111111     1111111111         ");
                    labyrinth.push(" ");
                    // labyrinth.push("                111111111111111111              ")
                    // labyrinth.push("                111111111111111111              ")
                    // labyrinth.push("                      111111                    ")
                    // labyrinth.push("                      111111                    ")
                    // labyrinth.push("                      111111                    ")
                    // labyrinth.push("                111111111111111111              ")
                    // labyrinth.push("                111111111111111111              ")
                    // labyrinth.push("")
                    labyrinth.push("");
                    labyrinth.push("                  11111    11111                ");
                    labyrinth.push("                111111111111111111              ");
                    labyrinth.push("                 1111111111111111               ");
                    labyrinth.push("                   111111111111                 ");
                    labyrinth.push("                     11111111                   ");
                    labyrinth.push("                      111111                    ");
                    labyrinth.push("                        11                      ");
                    labyrinth.push(" ");
                    labyrinth.push("             1111111111  11111111111            ");
                    labyrinth.push("             1111        111     111            ");
                    labyrinth.push("   1111111   1111        11111111111   1111111  ");
                    labyrinth.push("             1111        111     111            ");
                    labyrinth.push("             11111111111 111     111            ");
                    labyrinth.push(" ");
                    labyrinth.push(" ");
                    //              123456789012345678901234567890123456789012345678
                    //                       1         2         3         4
                    break;
            }
            var line_counter = 1;
            var pos_y = 0;
            labyrinth.forEach(function (map) {
                var pos = 0;
                var pos_x = 0;
                for (pos; pos < map.length; pos++) {
                    if (map.substr(pos, 1) == "1") {
                        // this._labyrinth.push(new objects.Barrier(this.assetManager, (pos)*tile_width, line_counter*tile_height+64 ))
                        _this._labyrinth.push(new objects.Barrier(_this.assetManager, pos_x, pos_y));
                    }
                    pos_x += tile_width;
                }
                line_counter++;
                pos_y += tile_height;
            });
        };
        return PlayScene3;
    }(objects.Scene));
    scenes.PlayScene3 = PlayScene3;
})(scenes || (scenes = {}));
// labyrinth.push("                                              ")  
// labyrinth.push("                                              ")  
// labyrinth.push("  1111111111111   1111111111111  11111111111  ")  
// labyrinth.push("  1                           1  1         1  ")
// labyrinth.push("  1                           1  1  11111  1  ")
// labyrinth.push("  1  1  11111111111111111     1  1  1   1  1  ")
// labyrinth.push("  1  1          1             1  1  1      1  ")
// labyrinth.push("  1  1          1             1  1  1   1  1  ")
// labyrinth.push("  1  11111      1      11111  1  1  1   1  1  ")
// labyrinth.push("     1       1111111                1   1     ")
// labyrinth.push("     1          1                   1   1     ")
// labyrinth.push("     1          1             1  1  1   1  1  ")
// labyrinth.push("  1  1  111111     111111     1  1  1   1  1  ")
// labyrinth.push("  1  1                        1  1  1   1  1  ")
// labyrinth.push("  1  1                        1  1  1   1  1  ")
// labyrinth.push("  1  1  11111111111111111     1  1      1  1  ")
// labyrinth.push("  1                           1  1  11111  1  ")
// labyrinth.push("  1                           1  1         1  ")
// labyrinth.push("  1111111111111   1111111111111  11111111111  ")  
// labyrinth.push("  1111111111111   1111111111111  11111111111  ")  
// labyrinth.push("  1111111111111   1111111111111  11111111111  ")  
// labyrinth.push("  1111111111111   1111111111111  11111111111  ")  
// labyrinth.push("  1111111111111   1111111111111  11111111111  ")  
// labyrinth.push("  1111111111111   1111111111111  11111111111  ")  
// labyrinth.push("                                              ")  
// labyrinth.push("  1111111111111   1111111111111  11111111111  ")  
//# sourceMappingURL=play3.js.map