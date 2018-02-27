    module objects {
    export class Bullet extends objects.GameObject {
        // Private Instance Variables
        private updateRate : number = 20;
        private angle : number =0;
        private xCartesianActual : number = 0;// register the actual x vector o the line in cartesian plan
        private yCartesianActual : number = 0;// register the actual x vector o the line in cartesian plan

        private canvasLeft : number;
        private canvasTop : number;
        private canvasWidth : number;
        private canvasHeight :number;

        // Public Properties

        // Constructor
            constructor(assetManager: createjs.LoadQueue, 
                x:number, 
                y:number, 
                angle:number, 
                canvasTop:number, 
                canvasLeft:number, 
                canvasWidth:number, 
                canvasHeight : number ) 
            {
                 super(assetManager,"bullet");
                
                
                //Difining the object position on screen
                this.x =  x - this.getBounds().width * 0.5;
                this.y = y - this.getBounds().height * 0.5;


                // The angle of the line  on screen
                this.angle = angle

                this.xCartesianActual = x;
                this.yCartesianActual = y;

                this.canvasLeft = canvasLeft;
                this.canvasTop = canvasTop;
                this.canvasWidth= canvasWidth;
                this.canvasHeight = canvasHeight;

            }
        // Public Methods

        public updateCache(){
            this.move();
        } 

        private move(){
            this.x = this.nextCartesianX()- this.getBounds().width * 0.5;
            this.y = this.nextCartesianY()- this.getBounds().height * 0.5;           
            this.CheckBounds();
        }

        // converts to Radians (the math functions cos() and sin() need an radian angle)
        private radians( _angle:number): number{
            let m : number = this.absoluteAngle(_angle)/180* Math.PI; 
            return this.absoluteAngle(_angle)/180* Math.PI; 
        }

        // Converts angles with high values (above 360) 
        // to the range between 0 and 360
        private absoluteAngle( _angle:number) : number{
            return  _angle % 360; // Checks the final angle  
        }

        // Checks which quadrant in a circle the referred angle belongs to
        // counter-clockwise
        private quadrant(_angle:number): number{
            let absolute : number = this.absoluteAngle(_angle);
            if(this.absoluteAngle(_angle) >270) return 4;
            if(this.absoluteAngle(_angle) >180) return 3;
            if(this.absoluteAngle(_angle) >90) return 2;
            
            return 1;
        }

        // Based on the new x-axis value y-axis is recalculated
        private nextCartesianY():number
        {
            this.nextCartesianX();
            this.yCartesianActual -= this.updateRate * Math.sin(this.radians(this.angle));
            return this.yCartesianActual; 
        }

        private nextCartesianX() : number{
            this.xCartesianActual += this.updateRate * Math.cos(this.radians(this.angle)) ; 
            return this.xCartesianActual;
        }

        public NoColision() : boolean {
            return !(this.xCartesianActual + this.getBounds().width> this.canvasWidth+ this.canvasLeft ||
                this.xCartesianActual+ this.getBounds().width < this.canvasLeft || 
                this.yCartesianActual+ this.getBounds().height> this.canvasTop+this.canvasHeight || 
                this.yCartesianActual+ this.getBounds().height< this.canvasTop)
                
        
        }

        public CheckBounds(){
            // right boundary
            if(this.x >= 1500 -  this.halfWidth) {
                this.x = 1500 - this.halfWidth;
            }
            // left boundary
            if(this.x <= this.halfWidth) {
                this.x = this.halfWidth;
            }

            // bottom boundary
            if(this.y >= 800 -  this.halfHeight) {
                this.y = 800 - this.halfHeight;
            }

            // top boundary
            if(this.y <= this.halfHeight) {
                this.y = this.halfHeight;
            }
        }

    }
}
