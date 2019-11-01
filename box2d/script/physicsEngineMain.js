const ESC_KEY = 27;


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

  let indexB = Scene.add(c, 400, 300);
  Scene.bodies[indexB].setStatic();

  let poly = new polygonShape();
  poly.setBox(300.0, 50.0);

  indexB = Scene.add(poly, 400, 500);
  Scene.bodies[indexB].setStatic();
  Scene.bodies[indexB].setOrient(0);

  //Scene.add(new circle(random(10.0,30.0)) ,500 , 500);

  //srand( 1 );

  let hPhysicsLoop = setInterval(PhysicsLoop,30);

  return 0;
}
