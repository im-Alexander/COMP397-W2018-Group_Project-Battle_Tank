/// <reference path="_references.ts"/>
// IIFE - Immediately Invoked Function Expression
(function () {
    // Game Variables
    var canvas = document.getElementById("canvas");
    var stage;
    var helloLabel;
    var clickMeButton;
    var assetManager;
    var assetManifest;
    var currentScene;
    var currentState;
    var keyboardManager;
    assetManifest = [
        { id: "clickMeButton", src: "./Assets/images/clickMeButton.png" },
        { id: "startButton", src: "./Assets/images/startButton.png" },
        { id: "nextButton", src: "./Assets/images/nextButton.png" },
        { id: "backButton", src: "./Assets/images/backButton.png" },
        { id: "bullet", src: "./Assets/images/bullet_small.png" },
        { id: "tank1", src: "./Assets/images/tank_green_1.png" },
        { id: "tank2", src: "./Assets/images/tank_blue_1.png" },
        { id: "terrain1", src: "./Assets/images/sand_pitchlAltered.jpg" },
        { id: "terrain2", src: "./Assets/images/grass_extended.png" },
        { id: "terrain3", src: "./Assets/images/gray_extended.png" },
        { id: "powerup", src: "./Assets/images/oil_barrel_small.png" },
        { id: "barrier", src: "./Assets/images/brick_big_1.png" },
        { id: "battle", src: "./Assets/audio/Battle_music_theme.ogg" },
        { id: "barrier_shot", src: "./Assets/audio/barrier_shot.ogg" },
        { id: "tank_engine", src: "./Assets/audio/tank_engine_short.ogg" },
        { id: "tank_fire", src: "./Assets/audio/tank_fire_1.ogg" }
    ];
    // preloads assets
    function Init() {
        console.log("Initialization Started...");
        assetManager = new createjs.LoadQueue(); // creates the assetManager object
        assetManager.installPlugin(createjs.Sound); // asset manager can also load sounds
        assetManager.loadManifest(assetManifest);
        assetManager.on("complete", Start, this);
    }
    function Start() {
        console.log("Starting Application...");
        stage = new createjs.Stage(canvas);
        stage.enableMouseOver(20); // turn this on for buttons
        createjs.Ticker.framerate = 60; // 60 FPS
        createjs.Ticker.on("tick", Update);
        objects.Game.stage = stage;
        objects.Game.currentScene = config.Scene.START;
        currentState = config.Scene.START;
        // keyboardManager = new managers.Keyboard();
        // objects.Game.keyboardManager = keyboardManager;
        Main();
    }
    function Update() {
        // if the scene that is playing returns another current scene
        // then call Main again and switch the scene
        if (currentState != objects.Game.currentScene) {
            Main();
        }
        currentScene.Update();
        stage.update(); // redraws the stage
    }
    function Main() {
        stage.removeAllChildren();
        switch (objects.Game.currentScene) {
            case config.Scene.START:
                currentScene = new scenes.StartScene(assetManager);
                break;
            case config.Scene.PLAY1:
                currentScene = new scenes.PlayScene1(assetManager);
                break;
            case config.Scene.PLAY2:
                currentScene = new scenes.PlayScene2(assetManager);
                break;
            case config.Scene.PLAY3:
                currentScene = new scenes.PlayScene3(assetManager);
                break;
            case config.Scene.OVER:
                currentScene = new scenes.OverScene(assetManager);
                break;
        }
        currentState = objects.Game.currentScene;
        stage.addChild(currentScene);
    }
    window.onload = Init;
})();
//# sourceMappingURL=game.js.map