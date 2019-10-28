
let hVeiw = document.getElementsByClassName("veiw")[0];
let hTitlemenu = document.getElementById("titlemenu");
let hBlack = document.getElementById("black");
let hCharmenu = document.getElementById("charmenu");

hTitlemenu.addEventListener("click", function(){
  hVeiw.style.visibility = "visible";
  hBlack.style.visibility = "visible";
  hCharmenu.style.visibility = "visible";
});



let userColor = "";


let hScroll = document.getElementsByClassName("scroll")[0];
hScroll.addEventListener("mousewheel", function(delta){
  //console.log("a");
  delta = window.event || delta;
  delta.preventDefault();
  let i = 0;
  let wheelAnimation = setInterval(function(){
    //console.log("z");
    if(i <= 50){
      //console.log((delta.wheelDelta || -delta.detail));
      hScroll.scrollLeft -= (delta.wheelDelta || -delta.detail) / 50;
      i++;
    }
    else{
      clearInterval(wheelAnimation);
    }

  },1);

});

let hScrollbuttonR = document.getElementById("scrollbuttonR");
let hScrollbuttonL = document.getElementById("scrollbuttonL");

hScrollbuttonR.addEventListener("click", function(){
  let i = 0;
  let wheelAnimation = setInterval(function(){
    //console.log("z");
    if(i <= 50){
      hScroll.scrollLeft -= (-300) / 50;
      i++;
    }
    else{
      clearInterval(wheelAnimation);
    }

  },1);
});

hScrollbuttonL.addEventListener("click", function(){
  let i = 0;
  let wheelAnimation = setInterval(function(){
    //console.log("z");
    if(i <= 50){
      hScroll.scrollLeft -= (300) / 50;
      i++;
    }
    else{
      clearInterval(wheelAnimation);
    }

  },1);

});


let hChar = hScroll.getElementsByTagName("DIV");
for(let i = 0; i < 4; i++){
  let hImg = hChar[i].getElementsByTagName("IMG")[0];
  hImg.addEventListener("click", function(){
    switch (i) {
      case 0:
        userColor = "red";
        break;
      case 1:
        userColor = "blue";
        break;
      case 2:
        userColor = "green";
        break;
      case 3:
        userColor = "orange";
        break;
      default:

    }
    console.log("userColor : " + userColor);

  });
}



let hCharmenux = document.getElementById("charmenux");
hCharmenux.addEventListener("click", function(){
  hVeiw.style.visibility = "hidden";
  hBlack.style.visibility = "hidden";
  hCharmenu.style.visibility = "hidden";

});
