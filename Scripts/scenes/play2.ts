module scenes {
    export class PlayScene2 extends objects.Scene {
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
      public _powerup1:objects.PowerUp;
      public _powerup2:objects.PowerUp;
  
          // Constructor
      constructor(assetManager: createjs.LoadQueue) {
        super(assetManager);
  
        this.Start();
      }
  
      // Private Mathods
  
      // Public Methods
  
      // Initialize Game Variables and objects
      public Start(): void {
  
        // Terrain to cover the canvas (It is temporally)
        this._terrain1 = new objects.Terrain(this.assetManager);
        this._terrain2 = new objects.Terrain(this.assetManager);
        this._terrain3 = new objects.Terrain(this.assetManager);
        this._terrain4 = new objects.Terrain(this.assetManager);
  
        this._terrain1.x=0;
        this._terrain1.y=0;
        this._terrain2.x=this._terrain1.getBounds().width;
        this._terrain2.y=0;
        this._terrain3.x=0;
        this._terrain3.y=this._terrain1.getBounds().height;
        this._terrain4.x=this._terrain3.getBounds().width;
        this._terrain4.y=this._terrain1.getBounds().height;
   
        this._labyrinth = new Array<objects.Barrier>();
        this.setLabyrinth2(2);
        //Players
        this._newTank1 = new objects.NewTank(this.assetManager,1,770,5,2);
        this._newTank2 = new objects.NewTank(this.assetManager,2,770, 820,2);
  
        this._powerup1 = new objects.PowerUp(this.assetManager);
        this._powerup2 = new objects.PowerUp(this.assetManager);
  
  
        // create scoreboard UI for scene
        this._scoreBoard = new managers.ScoreBoard();
  
  
        let objectsMap = new Array<objects.GameObject>();
        
        objectsMap.push(this._newTank1 );
        objectsMap.push(this._newTank2 );
        objectsMap.push(this._powerup1 );
        objectsMap.push(this._powerup2 );
        this._labyrinth.forEach(barrier=>{
          objectsMap.push(barrier);
        })
        objects.Game.objectsMap= objectsMap;
  
  
        this._scoreBoard.setFuel(this._newTank1.fuel, this._newTank2.fuel);
        this._scoreBoard.setHealth(this._newTank1.health, this._newTank2.health);
        this._scoreBoard.setScore(this._newTank1.score, this._newTank2.score);
  
        this.Main();
      }
  
      public Update(): void {
  
        this._newTank1.UpdateTank();
        this._newTank2.UpdateTank();
  
        this._powerup1.Update();
        this._powerup2.Update();
  
        this._scoreBoard.setFuel(this._newTank1.fuel, this._newTank2.fuel);
        this._scoreBoard.setHealth(this._newTank1.health, this._newTank2.health);
        this._scoreBoard.setScore(this._newTank1.score, this._newTank2.score);
        
        // If lives fall below 0 swith to game over scene
        if(this._newTank1.health <= 0 || this._newTank2.health <= 0){
          objects.Game.currentScene = config.Scene.PLAY3;
         
        }
  
      }
  
      // This is where the fun happens
      public Main(): void {
  
        
        
        this.addChild(this._terrain1);
        this.addChild(this._terrain2);
        this.addChild(this._terrain3);
        this.addChild(this._terrain4);
  
        this._labyrinth.forEach(barrier=>{
          this.addChild(barrier);
        });
  
        // add scoreboard labels to the scene
        this.addChild(this._scoreBoard._player1_HealthLabel);
        this.addChild(this._scoreBoard._player1_ScoreLabel);
        this.addChild(this._scoreBoard._player1_FuelLabel);
        this.addChild(this._scoreBoard._player2_HealthLabel);
        this.addChild(this._scoreBoard._player2_ScoreLabel);
        this.addChild(this._scoreBoard._player2_FuelLabel);
  
        // Add each bullet on the screen
        this._newTank1._bullets.forEach(bullet=>{
          this.addChild(bullet);
        });
        this._newTank2._bullets.forEach(bullet=>{
          this.addChild(bullet);
        });
  
        this.addChild(this._powerup1);
        this.addChild(this._powerup2);
  
        // add the tank to the scene
        this.addChild(this._newTank1);
        this.addChild(this._newTank2);
        
        
      }
  
      private setLabyrinth(tp :number = 1):void{
        let barrier  = new objects.Barrier(this.assetManager,-100,-100);
        let width = barrier.getBounds().width;
        let height = barrier.getBounds().height;
        let next_x = width;
        let next_y = 90;
        this._labyrinth.push(new objects.Barrier(this.assetManager,80, next_y));
        this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
        this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
        this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
        this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
        this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
        this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
        this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
        this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
        this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
        this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
        this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
        this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
  
        this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += (width*3),next_y ));
        this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
        this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
        this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
        this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
        this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
        this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
        this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
        this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
        this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
        this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
        this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
        this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
        this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
        this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
        this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
  
        let c :number =0;
        for(c=1;c<10; c++){
          next_y += 120;
          next_x = 70;
          this._labyrinth.push(new objects.Barrier(this.assetManager,80, next_y));
          this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
          this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
          this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
          this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
          this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
          this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
          this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
          this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
          this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
          this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
          this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
          this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
  
          this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += (width*3),next_y ));
          this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
          this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
          this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
          this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
          this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
          this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
          this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
          this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
          this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
          this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
          this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
          this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
          this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
          this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
          this._labyrinth.push(new objects.Barrier(this.assetManager,next_x += width,next_y ));
        }
  
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
            labyrinth.push("  1       1   1  1 1 1  1   1      1  1   1  1     ")
            labyrinth.push("  1       1   1  1   1  11111  11111  11111  11111")
            labyrinth.push("  1       1   1  1   1  1          1      1      1")
            labyrinth.push("  11111   11111  1   1  1      11111  11111  11111")
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
              // labyrinth.push("                111111111111111111              ")
              // labyrinth.push("                111111111111111111              ")
              // labyrinth.push("                      111111                    ")
              // labyrinth.push("                      111111                    ")
              // labyrinth.push("                      111111                    ")
              // labyrinth.push("                111111111111111111              ")
              // labyrinth.push("                111111111111111111              ")
              // labyrinth.push("")
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
        labyrinth.forEach(map =>{
          let pos : number =0;
          let pos_x : number =0;
  
          for(pos; pos<map.length; pos++){
            if(map.substr(pos,1)=="1"){
              // this._labyrinth.push(new objects.Barrier(this.assetManager, (pos)*tile_width, line_counter*tile_height+64 ))
              this._labyrinth.push(new objects.Barrier(this.assetManager, pos_x, pos_y ));
            }
            pos_x +=tile_width; 
          }
          line_counter++; 
          pos_y += tile_height;
        });
        
  
      }  
  }
  }
  
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
  