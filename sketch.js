let points = [[-2, 0], [-1,-1], [0, -1],[1,0],[1,2],[0,3],[-1,3],[-2,2],[-3,2],[-4,1],[-4,-2],[-5,-4],[-4,-4],[-3,-2],[-2,-1],[-2,-3], [-2,-4], [-1, -4],[0,-4],[0,-2],[2,-2],[2,-4], [4, -4],[4,1],[3,2],[1,2],[1,2]];

var line_colors = "ccd5ae-e9edc9-fefae0-faedcd-d4a373".split("-").map(a=>"#"+a)
var fill_colors = "606c38-283618-fefae0-dda15e-bc6c25".split("-").map(a=>"#"+a)

//畫point所有點的物件設定-------------------------------------
var ball //目前要處理的物件，暫時放在ball變數內
var balls =[]
//畫point所有點的物件設定-------------------------------------


//飛彈物件的定義---------------------------------------
var bullet  //目前要處理的物件暫時放在bullet變數內
var bullets = []
//飛彈物件的定義---------------------------------------

//怪物物件的定義---------------------------------------
var monster  //目前要處理的物件暫時放在bullet變數內
var monsters = []
//怪物物件的定義---------------------------------------
var shipP
//+++++++++++++設定砲台的位置

//++++++++++++++++++++
var score = 0

function preload(){ //程式碼準備執行前，所執行程式碼內容，比setup更早執行
  elephant_sound = loadSound("sound/elephant.mp3")
  bullet_sound = loadSound("sound/playsound.mp3")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  shipP = createVector (width/2,height/2) //預設砲台的位置在(width/2,height/2)
  for(var i=0;i<10;i=i+1){
    ball = new Obj({}) //產生一個Obj class元件
    balls.push(ball) //把ball物件放入ball陣列內
  }
  for(var i=0;i<10;i=i+1){
    monster = new Monster({}) //產生一個Obj class元件
    monsters.push(monster) //把ball物件放入ball陣列內
  }
}

function draw() {
  background(220);
  // for(var j=0;j<balls.length;j=j+1){
  //   ball= balls[j]
  //   ball.draw()
  //   ball.update()
  // }
  if(keyIsPressed){
    if(key =="ArrowLeft" || key=="a"){ // 按下鍵盤的往左鍵
      shipP.x = shipP.x - 5
    }
    if(key =="ArrowRight"|| key=="d"){ // 按下鍵盤的往右鍵
      shipP.x = shipP.x + 5
    }
    if(key =="ArrowUp"|| key=="w"){ // 按下鍵盤的往上鍵
      shipP.y = shipP.y - 5
    }
    if(key =="ArrowDown"|| key=="s"){// 按下鍵盤的往下鍵
      shipP.y = shipP.y + 5
}
  }

  //物件的顯示
  for(let ball of balls) 
  {
    ball.draw()
    ball.update()
    for(let bullet of bullets){
      if(ball.isBallInRanger(bullet.p.x,bullet.p.y)){  //飛彈物件有沒有接觸現在的ball
        balls.splice(balls.indexOf(ball),1) 
        bullets.splice(balls.indexOf(bullet),1)    
        score = score - 1
        elephant_sound.play()
    }
  }
  }

  //飛彈的顯示
  for(let bullet of bullets) 
  {
    bullet.draw()
    bullet.update()
  }

  //怪物的顯示

  for(let monster of monsters) 
    {
      if(monster.dead == true && monster.timenum>4){
        monsters.splice(monsters.indexOf(monster),1)
      }
      monster.draw()
      monster.update()
      for(let bullet of bullets){
        if(monster.isBallInRanger(bullet.p.x,bullet.p.y)){  //飛彈物件有沒有接觸現在的ball
          //monsters.splice(monsters.indexOf(monster),1) 
          bullets.splice(bullets.indexOf(bullet),1)    
          score = score + 1
          monster.dead = true
          //elephant_sound.play()
    }
  }
  }
  

  textSize(50)
  text (score,50,50)
  push()//重新規劃原點(0,0)，在視窗的中間
    let dx = mouseX - width/2
    let dy = mouseY - height/2
    let angle = atan2(dy,dx)
    translate(shipP.x,shipP.y)
    fill("#FF8F59")
    noStroke()
    rotate(angle)
    triangle(-25,-25,-25,25,50,0) //設定三個點,畫成一個三角形
    ellipse(0,0,50)
   
  pop()//恢復原本的設定,原點(0,0)在視窗的左上角
}

//在物件上按下滑鼠，物件消失不見，分數加一分
function mousePressed(){

  //++++++++++++產生一個物件
    // ball = new Obj({//產生一個Obj class元件
    //   p:{x:mouseX,y:mouseY}})
    // balls.push(ball) //把ball物件放入ball陣列內
  //+++++++++++++++
  // for(let ball of balls){
  //   if(ball.isBallInRanger()){
  //     balls.splice(balls.indexOf(ball),1)
  //     score = score + 1
  //   }
  // }

  //按一下產生飛彈
  bullet = new Bullet({
  r:10
  })
  bullets.push(bullet)
  bullet_sound.play()
}

function keyPressed(){
  if(key==" "){
    bullet = new Bullet({})
    bullets.push(bullet)
    bullet_sound.play()
  }
  
  }

