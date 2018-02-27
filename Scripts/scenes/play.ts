module scenes {
  export class PlayScene extends objects.Scene {
    // Private Instance Variables
    private _terrain: objects.Terrain;
    private _tank: objects.Tank;
    private _enemy: objects.Enemy;
    private _bullets : objects.Bullet[];
    private _labelTankDegree : objects.Label;
    private _labelTankX : objects.Label;
    private _labelTankY : objects.Label;
    private _labelBulletsQty : objects.Label;
    private _labelBulletsAnglesList:objects.Label;
    private _scoreBoard : managers.ScoreBoard;

    public areaTop: number=0;
    public areaLeft:number=0;
    public areaRight:number=0;
    public areaBottom:number=0;

    // Public Properties

    // Constructor
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager);

      this.areaTop = 5;
      this.areaBottom = 800;
      this.areaLeft= 5;
      this.areaRight= 1400;
      this.Start();
    }

    // Private Mathods

    // Public Methods

    // Initialize Game Variables and objects
    public Start(): void {
      this._terrain = new objects.Terrain(this.assetManager);
      this._tank = new objects.Tank(this.assetManager, (this.areaLeft+this.areaRight)*0.5, this.areaBottom*0.9);
      this._enemy = new objects.Enemy(this.assetManager);
      this._bullets = new Array<objects.Bullet>();
      this._labelTankDegree = new objects.Label("Tank Rotation :", "10px","Arial", "#ff0000",1400,10, false );
      this._labelTankX = new objects.Label("Tank X (axis) :", "10px","Arial", "#ff0000",1400,25, false );
      this._labelTankY = new objects.Label("Tank Y (axis) :", "10px","Arial", "#ff0000",1400,40, false );
      this._labelBulletsQty = new objects.Label("Bullets Qty :", "10px","Arial", "#ff0000",1400,55, false );
      this._labelBulletsAnglesList = new objects.Label("Bullets Degree :", "10px","Arial", "#ff0000",1400,70, false );
      this._terrain.setBounds(1,1,1230,830);

      // create scoreboard UI for scene
      this._scoreBoard = new managers.ScoreBoard();
      objects.Game.scoreBoard = this._scoreBoard;
      
      this.Main();
    }

    public Update(): void {
      this._terrain.Update();
      this._tank.Update();

      this._labelTankDegree.text="Tank Rotation : " + this._tank.rotation + "o";
      this._labelTankX.text = "Tank X (axis) :" + this._tank.x;
      this._labelTankY.text = "Tank Y (axis) :" + this._tank.y;
      this._labelBulletsQty.text = "Bullets Qty :"+ this._tank.bulletsCounter;

      managers.Collision.Check(this._enemy, this._tank);

      this._tank.nextBulletCounter++;
      if(this._tank.nextBulletCounter>20){
        if(objects.Game.keyboardManager.shoot){
        this._tank.bulletsCounter ++;
        console.log(this._tank.rotation)
        this._bullets[this._tank.bulletsCounter] = new objects.Bullet(this.assetManager, this._tank.x +this._tank.halfWidth, this._tank.y,this._tank.getAngle(),this.areaLeft, this.areaTop, this.areaRight, this.areaBottom);
        this._labelBulletsAnglesList.text = "Bullets Degree :" + this._tank.getAngle();
        this._tank.nextBulletCounter=0;
        this.addChild( this._bullets[this._tank.bulletsCounter] as (objects.Bullet));
        }
      }
      let colidedBullets: number[];
      let BulletsArraycounter : number =0;
      let counter: number=0;
      this._bullets.forEach(bullet => {
        bullet.updateCache();
        BulletsArraycounter++;
        if (!bullet.NoColision){
          colidedBullets[counter]= BulletsArraycounter;
        }
        managers.Collision.Check(this._enemy, bullet);
      });

      // if(colidedBullets.length>0){
      //   for(counter =0; counter< colidedBullets.length; counter++){  
      //     this._bullets.slice(colidedBullets[counter],1);
      //   }
      // }

      // If lives fall below 0 swith to game over scene
      if(this._scoreBoard.Health <= 0){
        objects.Game.currentScene = config.Scene.OVER;
      }

    }

    // This is where the fun happens
    public Main(): void {

      this.addChild(this._terrain);
      // add the tank to the scene
      this.addChild(this._tank);

      this.addChild(this._enemy);

      this.addChild(this._labelTankDegree);
      this.addChild(this._labelTankX);
      this.addChild(this._labelTankY);
      this.addChild(this._labelBulletsQty);
      this.addChild(this._labelBulletsAnglesList);

      // add scoreboard labels to the scene
      this.addChild(this._scoreBoard.HealthLabel);
      this.addChild(this._scoreBoard.ScoreLabel);
      this.addChild(this._scoreBoard.FuelLabel);
    }
  }
}
