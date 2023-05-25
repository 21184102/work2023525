//定義一個bullet的
class Bullet{
    constructor(args){
         this.r = args.r || 10  //設計的飛彈大小有大有小,傳送args.r來設定大小
         this.p = args.p || shipP.copy() //建立一個向量,{x:width/2 , y:heihght}
         this.v = args.v || createVector(mouseX-width/2,mouseY-height/2).limit(10)
         this.color = args.color || "#408080"
    }
    draw(){
        push()
            translate(this.p.x,this.p.y)
            fill(this.color)
            noStroke()
            ellipse(0,0,this.r)
        pop()

  
    }
    update(){
        this.p.add(this.v)
      
    }
  
  
  }
  