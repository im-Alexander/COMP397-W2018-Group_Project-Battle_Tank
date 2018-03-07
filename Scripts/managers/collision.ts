module managers{
    export class Collision{
        public static Check(object1:objects.GameObject, object2: objects.GameObject, objectOwnerOfObject2?: objects.GameObject){
            //create 2 Vec2 Objects
            let P1: math.Vec2 = new math.Vec2(object1.x, object1.y);
            let P2: math.Vec2 = new math.Vec2(object2.x, object2.y);
            let ref : number = math.Vec2.Distance(P1, P2);
            if(math.Vec2.Distance(P1, P2) < (object1.halfHeight + object2.halfHeight)){
                // if ((object2.name =="tank1" && object1.name=="xuxu")||(object2.name =="xuxu" && object1.name=="tank1")){
                //     console.log("Obj1.name : " + object1.name + " // Collision : "+ object1.isColliding+" //  X : " + object1.x + " //  Y : " + object1.y);
                //     console.log("Obj2.name : " + object2.name + " // Collision : "+ object2.isColliding+"  //  X : " + object2.x + " //  Y : " + object2.y);
                //     console.log( "P1 : " + P1 + " //  P2 : " + P2)
                //     console.log("ref : " + ref + " < obj.halfheigh : "+ object1.halfHeight + " + obj.halfheigh : "+ object2.halfHeight );
                // }
                // if(ref < (object1.halfHeight + object2.halfHeight)){
                if(!object2.isColliding){
                    object2.isColliding = true;
                    if(object2.name.toUpperCase()=="BULLET"){
                            if(object1.name.toUpperCase()=="TANK1" || object1.name.toUpperCase()=="TANK2"){
                                object1.health --;
                                objectOwnerOfObject2.score +=100;
                            }
                    
                            //objects.Game.scoreBoard.Score += 100;
                            // if(objects.Game.HighScore <= objects.Game.scoreBoard.Score){
                            //     objects.Game.scoreBoard.HighScore = objects.Game.scoreBoard.Score;
                            //     objects.Game.HighScore = objects.Game.scoreBoard.HighScore;
                            // }
                    } else if( object1.name.toUpperCase()=="POWERUP"){
                        object2.fuel = 100000;
                        object2.health ++;
                        object1.isColliding = true; // In the next update the powerup will be not visible
                        object2.isColliding = false;
                    }
                }   
            }else{
                object2.isColliding = false;
            }
        }
    }
}