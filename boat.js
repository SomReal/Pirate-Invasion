class Boat{
    constructor(x,y,w,h,boatpos,boatAni){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.boatpos = boatpos
        this.boatAni = boatAni
        this.speed = 0.05
        this.isbroken = false
        var options = {
            restitution:0.8,
            friction:1.0,
            density:1.0
        }
        this.image = loadImage("./assets/boat.png")
        this.body = Bodies.rectangle(x,y,w,h,options)
        World.add(world,this.body)
    }
    animate(){
        this.speed += 0.05
    }
    display(){
        var index = floor(this.speed% this.boatAni.length)
        push()
        translate(this.body.position.x,this.body.position.y)
        imageMode(CENTER)
        image(this.boatAni[index],0,this.boatpos,this.w,this.h)
        pop()
    }
    
    remove(index){
        this.boatAni = brokenAni
        this.speed = 0.05
        this.w = 300
        this.h = 300
        this.isbroken = true
        setTimeout(()=>{
            Matter.World.remove(world,boats[index].body)
            delete boats[index]
        }, 2000)
    }
}