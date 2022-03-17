const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,ground;
var balls = []
var boat
var boats = []
var boatAni = []
var boatspritedata,boatspritesheet
var brokenAni = []
var brokenspritedata,brokenspritesheet
var wateranimation = []
var splashspritedata,splashspritesheet
var isgameover = false
var bgsound
var cannonexplo
var cannonwat
var pirate
var score = 0

function preload() {
 bg = loadImage("./assets/background.gif")
 towerImg = loadImage("./assets/tower.png")
 boatspritedata = loadJSON("./assets/boat/boat.json")
 boatspritesheet = loadImage("./assets/boat/boat.png")
 brokenspritedata = loadJSON("./assets/boat/brokenBoat.json")
 brokenspritesheet = loadImage("./assets/boat/brokenBoat.png")
 splashspritedata = loadJSON("./assets/waterSplash/waterSplash.json")
 splashspritesheet = loadImage("./assets/waterSplash/waterSplash.png")
 bgsound = loadSound("./assets/background_music.mp3")
 cannonexplo = loadSound("./assets/cannon_explosion.mp3")
 cannonwat = loadSound("splash.flac")
 pirate = loadSound("./assets/pirate_laugh.mp3")
 
}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  ground = Bodies.rectangle(0, height - 1, width*2, 1,{isStatic:true})
  World.add(world,ground)
 tower = Bodies.rectangle(160,350,160,310,{isStatic:true})
 World.add(world,tower)
 angleMode(DEGREES)
 angle = 15
 cannon = new Cannon(180,110,130,100,angle)
 var boatFrames = boatspritedata.frames
 for (let i = 0; i < boatFrames.length; i++) {
   var pos = boatFrames[i].position
   var img = boatspritesheet.get(pos.x,pos.y,pos.w,pos.h)
   boatAni.push(img)
   
   
 }

 var brokenFrames = brokenspritedata.frames
 for (let i = 0; i < brokenFrames.length; i++) {
   var pos = brokenFrames[i].position
   var img = brokenspritesheet.get(pos.x,pos.y,pos.w,pos.h)
   brokenAni.push(img)
   
   
 }

 var splashFrames = splashspritedata.frames
 for (let i = 0; i < splashFrames.length; i++) {
   var pos = splashFrames[i].position
   var img = splashspritesheet.get(pos.x,pos.y,pos.w,pos.h)
   wateranimation.push(img)
   
   
 }
 
}

function draw() {
  background(189);
 image(bg,0,0,1200,600)
  Engine.update(engine);
  
  if (!bgsound.isPlaying()) {
    bgsound.play()
    bgsound.setVolume(0.1)
  }
  rect(ground.position.x, ground.position.y,width*2,1)
  push()
  imageMode(CENTER)
  image(towerImg,tower.position.x, tower.position.y,160,310)
  pop()
  showboats()
  
  cannon.display()
  fill ("#6d4c41")
  textSize(40)
  textAlign(CENTER)
  text("Score:"+score,width-200,50)
  for (let i = 0; i < balls.length; i++) {
    showcannonballs(balls[i], i)
  collisionwithboat(i)
  
    
  }
  
}
function keyReleased(){
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot()
    cannonexplo.play()
    cannonexplo.setVolume(0.2)
  }
}
function keyPressed(){
  if(keyCode === DOWN_ARROW) {
    cannonball = new CannonBall(cannon.x , cannon.y)
    balls.push(cannonball)
  }
}
function showcannonballs(ball, i){
  if(ball){
    ball.display()
    ball.animate()
    if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
      cannonwat.play()
      cannonwat.setVolume(0.1)
       ball.remove(i)
    }
  }
}
function showboats(){
  if (boats.length > 0) {
    if(boats[boats.length -1] === undefined || boats[boats.length -1].body.position.x < width-300){
      var pos = [-40,-60,-70,-20]
      var position = random(pos)
      var boat  = new Boat(width,height-60 ,170,170,position,boatAni)
      boats.push(boat)
    }
    for (let i = 0; i < boats.length; i++) {
      if(boats[i]){
        Matter.Body.setVelocity(boats[i].body,{x:-0.9,y:0})
        boats[i].display()
      boats[i].animate()

      var collision = Matter.SAT.collides(tower,boats[i].body)
      if (collision.collided && !boats[i].isbroken) {
        isgameover = true 
        pirate.play()
        pirate.setVolume(0.3)
        gameover()
      }
    }
    

    }
  } else {
    var boat  = new Boat(width,height-60,170,170,-60,boatAni)
    boats.push(boat)
  }

}
function collisionwithboat(index){
  for (let i = 0; i < boats.length; i++) {
    if(balls[index] !== undefined && boats[i] !== undefined){
      var collision = Matter.SAT.collides(balls[index].body, boats[i].body)
      if (collision.collided) {
        boats[i].remove(i)
        score += 5
        Matter.World.remove(world,balls[index].body)
        delete balls[index]
      }
    }
    
  }
}

function gameover(){
  swal({
    title:`Game Over!!`,
    text:"Thanks For Playing",
    imageUrl: "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
    imageSize: "150x150",
    confirmButtonText:"play again"
  },
  function(isConfirm){
    if (isConfirm) {
      location.reload()
    }
  })
}