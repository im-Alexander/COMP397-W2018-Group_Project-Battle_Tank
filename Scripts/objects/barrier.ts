module objects {
    export class Barrier extends objects.GameObject {
        // private instance variables
        private assetManager : createjs.LoadQueue;
        

        // Constructor
        constructor(assetManager: createjs.LoadQueue, x:number , y:number, hit: boolean=false) {
            super(assetManager, hit?"barrier_hitted":"barrier");
            this.x=x;
            this.y=y;
            this.health=3;
        }

        //Public Methods
        public Start():void {
        }

        public Update():void {
            if(this.health==2)
              this.image = new createjs.Bitmap("./assets/images/brick_big_2.png").image;
            else
                this.image = new createjs.Bitmap("./assets/images/brick_big_3.png").image;
        }
    }
}