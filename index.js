function resizeCanvas() {
  canvas.width = parseFloat(window.getComputedStyle(canvas).width);
  canvas.height = parseFloat(window.getComputedStyle(canvas).height);
}

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
resizeCanvas();

canvas.addEventListener('click', e => {
  let img = new Image();
  img.onload = function () {
    ctx.drawImage(img, e.offsetX - (97 / 2), e.offsetY - (126 / 2));
  }
  img.src = "assets/images/claudio.png";

  let soundNumber = Math.floor(Math.random() * 10) + 1;
  let sound = new Howl({
    src: [`assets/sounds/Claudio-${soundNumber}.mp3`]
  });
  sound.play();
});
