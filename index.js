function resizeCanvas() {
  canvas.width = parseFloat(window.getComputedStyle(canvas).width);
  canvas.height = parseFloat(window.getComputedStyle(canvas).height);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < claudios.length; i++) {
    if (sounds[claudios[i].n].playing(claudios[i].id)) {
      ctx.drawImage(img, claudios[i].x - (img.width / 2), claudios[i].y - (img.height / 2));
    }
  }
}

function clear() {
  for (let i = claudios.length - 1; i >= 0; i--) {
    if (!sounds[claudios[i].n].playing(claudios[i].id)) {
      claudios.splice(i, 1);
    }
  }
}

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let img = new Image();
img.src = "assets/images/claudio.png";

let soundNumber = 0;
let sounds = [];
for (let i = 1; i <= 10; i++) {
  sounds.push(
    new Howl({
      src: [`assets/sounds/Claudio-${i}.mp3`]
    })
  );
}

let claudios = [];

resizeCanvas();

window.addEventListener('resize', resizeCanvas);

canvas.addEventListener('click', e => {
  let newNumber = soundNumber++ % 10;
  claudios.push({
    x: e.offsetX,
    y: e.offsetY,
    n: newNumber,
    id: sounds[newNumber].play()
  });
});

setInterval(() => {
  draw();
  clear();
}, 1000 / 60);
