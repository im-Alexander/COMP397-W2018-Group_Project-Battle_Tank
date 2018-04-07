module scenes {
  export class PlayScene1 extends objects.Scene {
    // Private Instance Variables
    // Public Properties
    public _terrain1: objects.Terrain;
    public _terrain2: objects.Terrain;
    public _terrain3: objects.Terrain;
    public _terrain4: objects.Terrain;
    public _newTank1: objects.NewTank;
    public _newTank2: objects.NewTank;
    public _scoreBoard : managers.ScoreBoard;
    public _labyrinth: Array<objects.Barrier> ;
    public _popUpOil1:objects.PopUp;
    public _popUpOil2:objects.PopUp;
    public _popUpLife1:objects.PopUp;
    public _popUpLife2:objects.PopUp;
    // public _popUpSpeed1:objects.PopUp;
    // public _popUpSpeed2:objects.PopUp;
    public _popUpLandMines:Array<objects.PopUp> = new Array<objects.PopUp>();
    public LandMinesQty:number =15;
    public _key : managers.NewKeyboard;
    public _gamepaused : boolean;
    public _pauseButton : objects.Button;
    // Constructor
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager);
      this._pauseButton = new objects.Button(this.assetManager,"pause_button",-300,-300);
      this.Start();
    }

    private _pauseButtonClick():void {
      this.unpause();
    }

    // Private Mathods

    // Public Methods

    // Initialize Game Variables and objects
    public Start(): void {

      this._key = new managers.NewKeyboard();
      this._gamepaused=false;
      

      // Terrain to cover the canvas (It is temporally)
      this._terrain1 = new objects.Terrain(this.assetManager, "terrain1");
      this._terrain2 = new objects.Terrain(this.assetManager, "terrain1");
      this._terrain3 = new objects.Terrain(this.assetManager, "terrain1");
      this._terrain4 = new objects.Terrain(this.assetManager, "terrain1");

      this._terrain1.x=0;
      this._terrain1.y=0;
      this._terrain2.x=this._terrain1.getBounds().width;
      this._terrain2.y=0;
      this._terrain3.x=0;
      this._terrain3.y=this._terrain1.getBounds().height;
      this._terrain4.x=this._terrain3.getBounds().width;
      this._terrain4.y=this._terrain1.getBounds().height;
 
      this._labyrinth = new Array<objects.Barrier>();
      this.setLabyrinth2();
      //Players
      this._newTank1 = new objects.NewTank(this.assetManager,1,770,5,6);
      this._newTank2 = new objects.NewTank(this.assetManager,2,770, 820,6);

      this._popUpOil1 = new objects.PopUp(this.assetManager, "popUpOil","popUpOil");
      this._popUpOil2 = new objects.PopUp(this.assetManager, "popUpOil","popUpOil");
      this._popUpLife1 = new objects.PopUp(this.assetManager, "popUpLife","popUpLife");
      this._popUpLife2 = new objects.PopUp(this.assetManager, "popUpLife","popUpLife");
      this._popUpLife1 = new objects.PopUp(this.assetManager, "popUpSpeed","popUpSpeed");
      this._popUpLife2 = new objects.PopUp(this.assetManager, "popUpSpeed","popUpSpeed");
      var i=0
      for(i; i< this.LandMinesQty; i++){
        this._popUpLandMines.push(new objects.PopUp(this.assetManager, "popUpLandMine","popUpLandMine"))
      }
     


      // create scoreboard UI for scene
      this._scoreBoard = new managers.ScoreBoard();


      let objectsMap = new Array<objects.GameObject>();
      
      objectsMap.push(this._newTank1 );
      objectsMap.push(this._newTank2 );
      objectsMap.push(this._popUpOil1 );
      objectsMap.push(this._popUpOil2 );
      objectsMap.push(this._popUpLife1 );
      objectsMap.push(this._popUpLife2 );

      this._popUpLandMines.forEach(landMine => {
        objectsMap.push(landMine);
      });


      this._labyrinth.forEach(barrier=>{
        objectsMap.push(barrier);
      })
      objects.Game.objectsMap= objectsMap;


      this._scoreBoard.setFuel(this._newTank1.fuel, this._newTank2.fuel);
      this._scoreBoard.setHealth(this._newTank1.health, this._newTank2.health);
      this._scoreBoard.setScore(this._newTank1.score, this._newTank2.score);
      objects.Game.scoreBoard = new managers.ScoreBoard();
      objects.Game.scoreBoard.setFuel(this._newTank1.fuel, this._newTank2.fuel);      
      objects.Game.scoreBoard.setHealth(this._newTank1.health, this._newTank2.health);
      objects.Game.scoreBoard.setScore(this._newTank1.score, this._newTank2.score);


            

      this.Main();
    }

    public Update(): void {
      
      if(this._key.paused) this.pause();
      if( this._key.escape) this.unpause();
      if(this._gamepaused) return;

      this._newTank1.UpdateTank();
      this._newTank2.UpdateTank();

      this._popUpOil1.Update();
      this._popUpOil2.Update();
      this._popUpLife1.Update();
      this._popUpLife2.Update();

      this._popUpLandMines.forEach(landMine => {
        landMine.Update();
      });

      objects.Game.scoreBoard.setFuel(this._newTank1.fuel, this._newTank2.fuel);      
      objects.Game.scoreBoard.setHealth(this._newTank1.health, this._newTank2.health);
      objects.Game.scoreBoard.setScore(this._newTank1.score, this._newTank2.score);

      this._scoreBoard.setFuel(this._newTank1.fuel, this._newTank2.fuel);
      this._scoreBoard.setHealth(this._newTank1.health, this._newTank2.health);
      this._scoreBoard.setScore(this._newTank1.score, this._newTank2.score);

      // Scoreboard Player 1
      let fuel = document.getElementById("p1_fuel");
      let score = document.getElementById("p1_score");
      let health = document.getElementById("p1_health");
      fuel.innerHTML = (this._newTank1.fuel/1000).toString() + "%";
      health.innerHTML = this._newTank1.health.toString();
      score.innerHTML = this._newTank1.score.toString() ;

      // Scoreboard Player 2
      fuel = document.getElementById("p2_fuel");
      score = document.getElementById("p2_score");
      health = document.getElementById("p2_health");
      fuel.innerHTML = (this._newTank2.fuel/1000).toString() + "%";
      health.innerHTML = this._newTank2.health.toString();
      score.innerHTML = this._newTank2.score.toString() ;


      // If lives fall below 0 swith to game over scene
      if(this._newTank1.health <= 0 || this._newTank2.health <= 0 || (this._newTank1.fuel==0 && this._newTank2.fuel==0) ){
        objects.Game.currentScene = config.Scene.ROUND2;
        createjs.Sound.play("round_end_snd");
      }

    }

    // This is where the fun happens
    public Main(): void {
      if (objects.Game.playMusic){
        createjs.Sound.play("battle",{loop:-1});
        objects.Game.playMusic = false;
      }

 
      this.addChild(this._terrain1);
      this.addChild(this._terrain2);
      this.addChild(this._terrain3);
      this.addChild(this._terrain4);

      this._labyrinth.forEach(barrier=>{
        this.addChild(barrier);
      });

      // Add each bullet on the screen
      this._newTank1._bullets.forEach(bullet=>{
        this.addChild(bullet);
      });
      this._newTank2._bullets.forEach(bullet=>{
        this.addChild(bullet);
      });

      this.addChild(this._popUpOil1);
      this.addChild(this._popUpOil2);
      this.addChild(this._popUpLife1);
      this.addChild(this._popUpLife2);
      // this.addChild(this._popUpSpeed1);
      // this.addChild(this._popUpSpeed2);
      this._popUpLandMines.forEach(landMine => {
        this.addChild(landMine);
      });

      // add the tank to the scene
      this.addChild(this._newTank1);
      this.addChild(this._newTank2);

      this.addChild(this._pauseButton );
      this._pauseButton.on("pause", this._pauseButtonClick);
      this._pauseButton.on("pause", this._pauseButtonClick);
    }

    private pause(){
      this._gamepaused=true;
      this._pauseButton.x=750;
      this._pauseButton.y=400;
    }
    private unpause(){
      this._gamepaused=false;
      this._pauseButton.x=-300;
      this._pauseButton.y=-300;
    }
    
    private setLabyrinth2(tp :number = 1):void{
      let labirinth_total_horizontal_tiles = 46;
      let labirinth_total_vertica_tiles = 25;
      let tile_width : number = 30; 
      let tile_height : number = 30;

      let labyrinth : Array<string> = new Array<string>();
      switch(tp){
        case 1:
          //                       1         2         3         4
          //              123456789012345678901234567890123456789012345678
          labyrinth.push(" ")  
          labyrinth.push(" ")  
          labyrinth.push("  11111   11111  11 11  11111  11111  11111  11111")  
          labyrinth.push("  1       1   1  1 1 1  1   1      1  1   1      1")
          labyrinth.push("  1       1   1  1   1  11111  11111  11111      1")
          labyrinth.push("  1       1   1  1   1  1          1      1      1")
          labyrinth.push("  11111   11111  1   1  1      11111  11111      1")
          labyrinth.push("")
          labyrinth.push("")
          labyrinth.push("  1     1  111111  11111  11111  1  11111  11111  ")
          labyrinth.push("  1     1  1    1  1   1  1   1  1  1   1  1   1  ")
          labyrinth.push("  1  1  1  111111  11111  11111  1  1   1  11111  ")
          labyrinth.push("  1 111 1  1    1  1  1   1  1   1  1   1  1  1   ")  
          labyrinth.push("  1111111  1    1  1   1  1   1  1  11111  1   1  ")  
          labyrinth.push(" ")
          labyrinth.push("    1111111  1111111  1111111  1        1111111   ")
          labyrinth.push("    1        1     1  1        1        1         ")
          labyrinth.push("    1111111  1111111  1  1111  1        1111111   ")
          labyrinth.push("    1        1     1  1     1  1        1         ")
          labyrinth.push("    1111111  1     1  1111111  1111111  1111111   ")
          labyrinth.push(" ")
          labyrinth.push("       11111  1   1  1      11111  11111   11  ")  
          labyrinth.push("       1   1  1   1  1      1      1       11  ")  
          labyrinth.push("       11111  1   1  1      11111  11111   11  ")  
          labyrinth.push("       1  1   1   1  1      1          1       ")  
          labyrinth.push("       1   1  11111  11111  11111  11111   11  ")  
          //              123456789012345678901234567890123456789012345678
          //                       1         2         3         4
          break;
        case 2:
          //                       1         2         3         4
          //              123456789012345678901234567890123456789012345678
          labyrinth.push(" ")  
          labyrinth.push(" ")  
          labyrinth.push("        111111111  111111111  1111 1111           ")
          labyrinth.push("            11     11     11  11 111 11           ")
          labyrinth.push("  111111    11     11     11  11  1  11  1111111  ")
          labyrinth.push("  111111    11     11     11  11     11  1111111  ")
          labyrinth.push("            11     111111111  11     11           ")
          labyrinth.push("")
          labyrinth.push("")
          labyrinth.push("     111111  111111    111111  11  11  111111     ")
          labyrinth.push("       11    11          11    11  11  1          ")
          labyrinth.push("       11    111111      11    111111  111111     ")
          labyrinth.push("       11        11      11    11  11  1          ")  
          labyrinth.push("     111111  111111      11    11  11  111111     ")  
          labyrinth.push("")
          labyrinth.push(" ")
          labyrinth.push("    1111111111   11       11  111       111   111 ")
          labyrinth.push("    11           11       11   11       11    111 ")
          labyrinth.push("    11  1111111  11       11   11111111111    111 ")
          labyrinth.push("    11       11  11       11        11            ")
          labyrinth.push("    11111111111  11111111111        11        111 ")
          labyrinth.push(" ")
          labyrinth.push("  1111111111111111111111111111111111111111111111  ")  
          labyrinth.push(" ")  
          labyrinth.push(" ")  
          labyrinth.push("111111111111111111111      11111111111111111111111")  
        //              123456789012345678901234567890123456789012345678
          //                       1         2         3         4
          break;

        case 3:
            //                       1         2         3         4
            //              123456789012345678901234567890123456789012345678
            labyrinth.push(" ")  
            labyrinth.push(" ")  
            labyrinth.push("         1111           1111  1111111111         ")
            labyrinth.push("         1111           1111  1111               ")
            labyrinth.push("  1111   1111           1111  1111111111  1111   ")
            labyrinth.push("         1111    111    1111  1111               ")
            labyrinth.push("          1111   111   1111   1111               ")
            labyrinth.push("            1111111111111     1111111111         ")
            labyrinth.push(" ")
            labyrinth.push("") 
            labyrinth.push("                  11111    11111                ")
            labyrinth.push("                111111111111111111              ")
            labyrinth.push("                 1111111111111111               ")
            labyrinth.push("                   111111111111                 ")
            labyrinth.push("                     11111111                   ")
            labyrinth.push("                      111111                    ")
            labyrinth.push("                        11                      ")
            labyrinth.push(" ")
            labyrinth.push("             1111111111  11111111111            ")
            labyrinth.push("             1111        111     111            ")
            labyrinth.push("   1111111   1111        11111111111   1111111  ")
            labyrinth.push("             1111        111     111            ")
            labyrinth.push("             11111111111 111     111            ")
            labyrinth.push(" ")
            labyrinth.push(" ")
            //              123456789012345678901234567890123456789012345678
            //                       1         2         3         4
            break;
      }
      let line_counter : number =1
      let pos_y =0;
      let barrierImageSequence:Array<string>;


      labyrinth.forEach(map =>{
        let pos : number =0;
        let pos_x : number =0;

        for(pos; pos<map.length; pos++){
          if(map.substr(pos,1)=="1"){
            if(Math.random()<=0.8)
                this._labyrinth.push(new objects.Barrier(this.assetManager,"barrier", pos_x, pos_y ,true));
              else
                this._labyrinth.push(new objects.Barrier(this.assetManager,"barrier_undestructible", pos_x, pos_y ,false));
          }
          pos_x +=tile_width; 
        }
        line_counter++; 
        pos_y += tile_height;
      });
      

    }  
}
}

