class Bird extends BaseClass {
  constructor(x,y){
    super(x,y,50,50);
    this.image = loadImage("sprites/bird.png");
    this.picture=loadImage("sprites/smoke.png")
    this.trajectory=[]
  }

  display() {
  
    super.display();
    if(this.body.velocity.x>8&&this.body.position.x>210){
    var Position=[this.body.position.x,this.body.position.y]
    this.trajectory.push(Position)}
    //console.log(this.trajectory)
    for(var i=0;i<this.trajectory.length;i++){
      image(this.picture,this.trajectory[i][0],this.trajectory[i][1])
    }

    
  }
  
}
