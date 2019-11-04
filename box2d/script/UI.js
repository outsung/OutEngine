//------------------------------------------------------------------------------ define
//--------------------------------------------------------------------------HTML
let hUserscreen = document.getElementById("userscreen");
let hBuffer = document.getElementById("buffer");

//let hScroll = document.getElementsByClassName("scroll")[0];

let ui = {
  scale : 100,

  tabmenu : {
    width : 0,
    height : 0
  },

  tabmenuCheck : false,
  hFilter : document.getElementById("filter"),
  hTabbutton : document.getElementsByClassName("uibutton")[2],
  hMouseR : document.getElementsByClassName("uibutton")[0],
  hMouseL : document.getElementsByClassName("uibutton")[1],
  hTabmenu : document.getElementById("tabmenu")

}

let buffers = {
  0 : document.getElementById("buffer1"),
  1 : document.getElementById("buffer2")
}


//"title ? char ? play ?
//let check = "title";

const width = 2000;
const height = 2000;

//console.log(width / 2 - window.innerWidth/2);

let camera = {
  position : {
    x : -(width - window.innerWidth) / 2,
    y : -(height - window.innerHeight) / 2
  },
  scale : 1.0,
  lineWidth : 1.0
}
//(window.innerHeight / 2) -
// material = Rock, Wood, Metal, BouncyBall, SuperBall, Pillow, Static
let userMaterial = "SuperBall";


function resize(){
  //console.log('Resizing...')

  //userScreen.width = window.innerWidth;
  //userScreen.height = window.innerHeight;
  buffers[0].style.marginLeft = camera.position.x + "px";
  buffers[0].style.marginTop = camera.position.y + "px";

  buffers[1].style.marginLeft = camera.position.x + "px";
  buffers[1].style.marginTop = camera.position.y + "px";

  hBuffer.style.marginLeft = camera.position.x + "px";
  hBuffer.style.marginTop = camera.position.y + "px";

  hUserscreen.style.width = window.innerWidth + "px";
  hUserscreen.style.height = window.innerHeight + "px";


  // UI


  ui.hTabmenu.style.height = window.innerHeight + "px";
  ui.hTabmenu.style.width = Math.round(window.innerWidth / 4) + "px";

  ui.hTabmenu.style.marginLeft = ui.tabmenuCheck == true ?
                          window.innerWidth - Math.round(window.innerWidth / 4) + "px":
                          window.innerWidth + "px";

  ui.hTabbutton.style.marginTop = Math.round((window.innerHeight - ui.scale) / 2) + "px";
  //console.log(ui.hTabmenu.style.width);
  ui.hTabbutton.style.marginLeft = ui.tabmenuCheck == true ?
        window.innerWidth - Math.round(window.innerWidth / 4) - ui.scale / 2 + "px":
        window.innerWidth - ui.scale / 2 + "px";

  ui.hMouseR.style.marginTop = Math.round(window.innerHeight / 8 * 6) + "px";
  ui.hMouseR.style.marginLeft = Math.round(window.innerWidth + ui.scale) / 2 + "px";

  ui.hMouseL.style.marginTop = Math.round(window.innerHeight / 8 * 6) + "px";
  ui.hMouseL.style.marginLeft = Math.round((window.innerWidth - ui.scale * 3) / 2) + "px";


  ui.hFilter.style.width = window.innerWidth + "px";
  ui.hFilter.style.height = window.innerHeight + "px";

};


//------------------------------------------------------------------------buffer



let drawingBuffer = 0;

let ctx = buffers[drawingBuffer].getContext("2d");


function bufferInit(){
  hBuffer.style.width = width + "px";
  hBuffer.style.height = height + "px";

  buffers[drawingBuffer].width = width;
  buffers[drawingBuffer].height = height;
  bufferFlip();
  buffers[drawingBuffer].width = width;
  buffers[drawingBuffer].height = height;
}


function bufferFlip(){

  buffers[1-drawingBuffer].style.visibility = 'hidden';
  buffers[1-drawingBuffer].style.zIndex = 0;

  buffers[drawingBuffer].style.visibility = 'visible';
  buffers[drawingBuffer].style.zIndex = 1;

  drawingBuffer = 1 - drawingBuffer;

  ctx = buffers[drawingBuffer].getContext("2d");

  ctx.clearRect(0, 0, width, height);
}



//-------------------------------------------------------------------------Scene

//context.lineWidth = 15;
//document.getElementById("log").innerHTML = "Material : " + userMaterial;

function canvasColor(r,g,b,a){
  return "rgba("+ r +", "+ g +", "+ b +", "+ a +")";
}

function canvasDot(x,y,r){
  //console.log(x,y,r);
  ctx.arc(x, y, r, 0.5, PI * 3);
}

circle.prototype.draw = function(){
  //console.log("draw!");
  const k_segments = 20;

  // Render a circle with a bunch of lines
  ctx.strokeStyle = canvasColor(this.body.r, this.body.g, this.body.b, 1);
  ctx.beginPath();
  canvasDot(this.body.position.x, this.body.position.y, this.radius);
  ctx.closePath();
  ctx.lineWidth = camera.lineWidth;
  ctx.stroke();

  // Render line within circle so orientation is visible
  ctx.beginPath();
  let r = new vector2(0, 1.0);
  let c = Math.cos(this.body.orient);
  let s = Math.sin(this.body.orient);
  r.set(r.x * c - r.y * s, r.x * s + r.y * c);
  r.x *= this.radius; r.y *= this.radius;
  r.x += this.body.position.x; r.y += this.body.position.y;

  ctx.moveTo(this.body.position.x, this.body.position.y);
  ctx.lineTo(r.x, r.y);
  ctx.closePath();
  ctx.lineWidth = camera.lineWidth;
  ctx.stroke();
};
polygonShape.prototype.draw = function(){

  //console.log("draw! poly");

  ctx.strokeStyle = canvasColor(this.body.r, this.body.g, this.body.b, 1);
  ctx.beginPath();
  let startDot = new vector2(0,0);

  for(let i = 0; i < this.m_vertexCount; ++i){
    let temp = this.u.multiplicationV(this.m_vertices[i]);
    let v = new vector2(this.body.position.x + temp.x,
                        this.body.position.y + temp.y);
    //console.log(this.body.position.y+", "+temp.y);
    if(i == 0){
      startDot.set(v.x, v.y);
      ctx.moveTo(v.x, v.y);
    }
    else{
      ctx.lineTo(v.x, v.y);
    }

  }

  ctx.lineTo(startDot.x, startDot.y);
  ctx.closePath();
  ctx.lineWidth = camera.lineWidth;
  ctx.stroke();


  for(let i = 0; i < this.m_vertexCount; ++i){
    ctx.beginPath();
    let temp = this.u.multiplicationV(this.m_vertices[i]);
    let v = new vector2(this.body.position.x + temp.x,
                        this.body.position.y + temp.y);
    //console.log(this.body.position.y+", "+temp.y);
    if(i == 0){
      canvasDot(v.x, v.y, 3);
    }
    else{
      canvasDot(v.x, v.y, 2);
    }
    ctx.closePath();
    ctx.lineWidth = camera.lineWidth;
    ctx.stroke();

  }

}
scene.prototype.render = function(){
  //console.log("scene render")

  for(let i = 0; i < size(this.bodies); ++i){
    let b = this.bodies[i];
    //console.log("shape draw");
    b.shape.draw();
  }




  ctx.strokeStyle = canvasColor(255, 106, 183, 1);
  for(let i = 0; i < mouse.catch.length; ++i){
    ctx.beginPath();
    let j = mouse.catch[i];

    //console.log(this.bodies[j],mouse);
    ctx.moveTo(this.bodies[j].position.x, this.bodies[j].position.y);
    ctx.lineTo(mouse.x, mouse.y);

    ctx.closePath();
    ctx.lineWidth = camera.lineWidth;
    ctx.stroke();

  }




  ctx.strokeStyle = canvasColor(200, 0, 0, 0.5);

  for(let i = 0; i < size(this.contacts); ++i){
    //Manifold& m = this.contacts[i];
    for(let j = 0; j < this.contacts[i].contact_count; ++j){
      let c = new vector2(this.contacts[i].contacts[j].x,
                          this.contacts[i].contacts[j].y);
      ctx.beginPath();
      canvasDot(c.x, c.y, 3);
      ctx.closePath();
      ctx.lineWidth = camera.lineWidth;
      ctx.stroke();

    }
  }



  ctx.strokeStyle = canvasColor(0, 200, 0, 0.5);

  for(let i = 0; i < size(this.contacts); ++i){
    //Manifold& m = contacts[i];
    ctx.beginPath();
    let n = new vector2(this.contacts[i].normal.x,
                        this.contacts[i].normal.y);
    for(let j = 0; j < this.contacts[i].contact_count; ++j){

      let c = new vector2(this.contacts[i].contacts[j].x,
                          this.contacts[i].contacts[j].y);

      ctx.moveTo(c.x, c.y);
      n.x *= 4.5;
      n.y *= 4.5;
      c.x += n.x;
      c.y += n.y;
      ctx.lineTo(c.x, c.y);
    }

    ctx.closePath();
    ctx.lineWidth = camera.lineWidth;
    ctx.stroke();
  }


}



//------------------------------------------------------------------------------ init

bufferInit();
resize();


//------------------------------------------------------------------------------ main

let Scene = new scene(dt, 10);
let g_Clock = new clock();
let frameStepping = true;
let canStep = true;
let accumulator = 0;

main();

function PhysicsLoop(){
  //glClear( GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT );

  //RenderString( 1, 2, "Left click to spawn a polygon" );
  //RenderString( 1, 4, "Right click to spawn a circle" );

  // Different time mechanisms for Linux and Windows
  accumulator = 0;
  accumulator += g_Clock.elapsed() / 10;


  g_Clock.start();
  //console.log(accumulator +",  "+dt);

  accumulator = clamp(0.00, 0.1, accumulator);
  while(accumulator >= dt){
    if(frameStepping)
      Scene.step();
    else{
      if(canStep){
        Scene.step();
        canStep = false;
      }
    }
    accumulator -= dt;
  }


  g_Clock.stop();

  Scene.render();

  bufferFlip();

}

function main(){

  let c = new circle(50.0);

  let indexB = Scene.add(c, width / 2, height / 2 - 100);
  Scene.bodies[indexB].setStatic();

  let poly = new polygonShape();
  poly.setBox(300.0, 50.0);

  indexB = Scene.add(poly, width / 2, height / 2 + 100);
  Scene.bodies[indexB].setStatic();
  Scene.bodies[indexB].setOrient(0);

  //Scene.add(new circle(random(10.0,30.0)) ,500 , 500);

  //srand( 1 );

  let hPhysicsLoop = setInterval(PhysicsLoop,30);

  return 0;
}


//-------------------------------------------------------------------------mouse
// F = add ,del ,catch, enter, break, move
//


//
let mouseFlist = {
  "add" : 0,
  "del" : 1,
  "catch" : 2,
  "enter" : 3,
  "break" : 4,
  "move" : 5
}

function getMouseSelect(mouseX, mouseY){
  for(let i = 0; i < size(Scene.bodies); ++i){
    let typeA = Scene.bodies[i].shape.getType();
    if(typeA == "ePoly"){
      if(PolygontoPoint(Scene.bodies[i], new vector2(mouseX, mouseY))){
        return i;
      }
    }
    else if(typeA == "eCircle"){
      if(CircletoPoint(Scene.bodies[i], new vector2(mouseX, mouseY))){
        return i;
      }
    }
  }
  return -1;
}

function catchMove(i){

  let mouseForce = new vector2(mouse.x - Scene.bodies[i].position.x,
                              mouse.y - Scene.bodies[i].position.y);

  let length = mouseForce.lengthXX2() / 10000;
  length = clamp(0.9, 3, length);

  mouseForce.x *= Scene.bodies[i].m;
  mouseForce.y *= Scene.bodies[i].m;
  if(length != 0.9){
    mouseForce.x *= length;
    mouseForce.y *= length;
  }
  //console.log(mouseForce);
  mouseForce.x -= Scene.bodies[i].m * gravity.x * 3;
  mouseForce.y -= Scene.bodies[i].m * gravity.y * 3;
  //console.log(gravity.y * gravity.y * 40);
  //console.log(Scene.bodies[i].m * 150);

  Scene.bodies[i].applyForce(mouseForce);
}


function mouseF(f1, f2){
  switch (f1) {

    case "add":
      switch (f2) {

        case "circle":
          return function(downANDup){
            if(downANDup == "down"){
              let c = new circle(random(10.0,30.0));
              let indexB = Scene.add(c, mouse.x, mouse.y);
              Scene.bodies[indexB].material = userMaterial;
              Scene.bodies[indexB].initialize();
            }
          };
          break;

        case "polygon":
          return function(downANDup){
            if(downANDup == "down"){
              let poly = new polygonShape();
              let count = random(3,64);

              let vertices = {};
              let e = random(50,100);

              for(let i = 0; i < count; ++i){
                vertices[i] = new vector2(random(-e, e), random(-e, e));
              }
              //console.log("A");
              poly.set(vertices, count);
              //console.log("B");
              let indexB = Scene.add(poly, mouse.x, mouse.y );
              Scene.bodies[indexB].setOrient(random(-PI,PI));
              Scene.bodies[indexB].material = userMaterial;
              Scene.bodies[indexB].initialize();
              Scene.bodies[indexB].dynamicFriction = 0.2;
              Scene.bodies[indexB].staticFriction = 0.4;
            }
          };
          break;

      }
      break;

    case "del":
      switch (f2) {

        case "one":
          return function(downANDup){
            if(downANDup == "down"){
              let i = getMouseSelect(mouse.x, mouse.y);
              if(i != -1){
                Scene.delete.push(i);
              }
            }
          };
          break;

        case "all":
          return function(downANDup){
            if(downANDup == "down"){
              Scene.clear();
            }
          };
          break;

      }
      break;

    case "catch":
      switch (f2) {

        case "one":
          return function(downANDup){
            if(downANDup == "down"){
              let i = getMouseSelect(mouse.x, mouse.y);
              if(i != -1){
                mouse.catch[0] = i;
                mouse.hCatch[0] = setInterval(function(){catchMove(i)}, 16);
              }
            }
            else{
              //console.log("quit");
              clearInterval(mouse.hCatch[0]);
              mouse.hCatch = [];
              mouse.catch = [];
            }
          };
          break;

        case "connect":
          return function(downANDup){
            if(downANDup == "down"){
              let i = getMouseSelect(mouse.x, mouse.y);
              if(i != -1){
                let cathIndex = mouse.catch.indexOf(i);
                if(cathIndex === -1){
                  mouse.catch.push(i);
                  mouse.hCatch.push(setInterval(function(){catchMove(i)}, 16));
                }
                else{
                  clearInterval(mouse.hCatch[cathIndex]);
                  mouse.catch.splice(cathIndex, 1);
                  mouse.hCatch.splice(cathIndex, 1);
                }
              }
            }
          };
          break;

        case "quit":
          return function(downANDup){
            if(downANDup == "down"){
              for(let i = 0; i < size(mouse.hCatch); ++i){
                clearInterval(mouse.hCatch[i]);
              }
              mouse.catch = [];
              mouse.hCatch = [];
            }
          }
          break;

      }
      break;

    case "move":
      switch (f2) {

        case "basic":
          return function(downANDup){
            if(downANDup == "down"){
              mouse.move = true;
            }
            else{
              mouse.move = false;
            }
          }
          break;

        case "reset":
          return function(downANDup){
            if(downANDup == "down"){
              if(mouse.move == false){
                camera.position.x = -(width - window.innerWidth) / 2;
                camera.position.y = -(height - window.innerHeight) / 2;
                resize();
              }
            }
          }
          break;

      }
      break;

  }
}

//
let mouse = {
  x : 0,
  y : 0,
  R : mouseF("add","circle"),
  L : mouseF("add","polygon"),

  hCatch : [],
  catch : [],

  move : false
};





// 기본 우클릭 기능 중지
document.addEventListener('contextmenu', function(){
  event.preventDefault();
});


hBuffer.addEventListener('mousemove', function(event){
  //console.log("x : " + event.movementX + ", y : " + event.movementY);
  //mapRotate(event.movementX);
  mouse.x = event.offsetX;
  mouse.y = event.offsetY;

  if(mouse.move){
    //console.log("move"+ Math.round(event.movementX));

    camera.position.x += Math.round(event.movementX);
    camera.position.y += Math.round(event.movementY);

    buffers[0].style.marginLeft = camera.position.x + "px";
    buffers[0].style.marginTop = camera.position.y + "px";

    buffers[1].style.marginLeft = camera.position.x + "px";
    buffers[1].style.marginTop = camera.position.y + "px";

    hBuffer.style.marginLeft = camera.position.x + "px";
    hBuffer.style.marginTop = camera.position.y + "px";
  }

  //console.log(player.direction);
});






// 마우스 다운
hBuffer.addEventListener('mousedown', function(event){
  // 우클릭시
  if((event.button == 2) || (event.which == 3)){
    //console.log(mouse.R);
    mouse.R("down");
  }
  else if((event.button == 0) || (event.which == 1)){

    mouse.L("down");
  }

});


// 마우스 업
hBuffer.addEventListener('mouseup', function(event){
  //우클릭시
  if((event.button == 2) || (event.which == 3)){
    mouse.R("up");
  }
  else if((event.button == 0) || (event.which == 1)){
    mouse.L("up");
  }

});


// canvas 넘어가고 마우스 up 할 때
hUserscreen.addEventListener('mouseup', function(event){
  if((event.button == 2) || (event.which == 3)){
    mouse.R("up");
  }
  else if((event.button == 0) || (event.which == 1)){
    mouse.L("up");
  }
});



ui.hTabbutton.addEventListener('click', function(){
  // 메뉴 펼침
  if(ui.tabmenuCheck == false){
    //console.log(ui.hTabmenu.style.width);
    ui.tabmenuCheck = true;
    ui.hTabbutton.style.marginLeft =
        window.innerWidth - Math.round(window.innerWidth / 4) - ui.scale / 2 + "px";
    ui.hTabmenu.style.marginLeft = window.innerWidth - Math.round(window.innerWidth / 4) + "px";
    ui.hFilter.style.visibility = "visible";
  }
  else{
    console.log("false" + window.innerWidth + "px");
    ui.tabmenuCheck = false;
    ui.hTabbutton.style.marginLeft = window.innerWidth - ui.scale / 2 + "px";
    ui.hTabmenu.style.marginLeft = window.innerWidth + "px";
    ui.hFilter.style.visibility = "hidden";
  }
});



// 휠

hUserscreen.addEventListener('mousewheel', function(delta){
  if(mouse.move == false){
    buffers[0].style.transformOrigin = camera.position.x + " " + camera.position.y;
    buffers[1].style.transformOrigin = camera.position.x + " " + camera.position.y;

    hBuffer.style.transformOrigin = camera.position.x + " " + camera.position.y;

    if(delta.wheelDelta >= 0){
      camera.scale += 0.05;
      if(camera.scale >= 2.5)
        camera.scale = 2.5;
    }
    else{
      camera.scale -= 0.05;
      if(camera.scale <= 0.1)
        camera.scale = 0.1;
    }

    buffers[0].style.transform = "scale(" + camera.scale + ")";
    buffers[1].style.transform = "scale(" + camera.scale + ")";
    hBuffer.style.transform = "scale(" + camera.scale + ")";

    camera.lineWidth = camera.scale * -12 + 11;
    camera.lineWidth = Math.max(1, camera.lineWidth);
    console.log(camera.scale , camera.lineWidth);
  }
});

//캐릭터 휠
/*
hScroll.addEventListener('mousewheel', function(delta){
  console.log("mousewheel");
  delta = window.event || delta;
  delta.preventDefault();
  document.hScroll.scrollLeft -= (delta.wheelDelta || -delta.detail);
});

*/
//--------------------------------------------------------------ketbord



let keyCode = {
  27 : false, //esc

  87 : false, //w
  65 : false, //a
  83 : false, //s
  68 : false, //d

  84 : false, //t
}

function keyPress(){};
function keyUp(){};
