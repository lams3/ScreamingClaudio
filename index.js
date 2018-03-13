function resizeCanvas() {
  canvas.width = parseFloat(window.getComputedStyle(canvas).width);
  canvas.height = parseFloat(window.getComputedStyle(canvas).height);
}

function randomPoint() {
  return {
    x: Math.floor(Math.random() * canvas.width),
    y: Math.floor(Math.random() * canvas.height)
  }
}

function randomPoints(n) {
  let list = [];
  for (var i = 0; i < n; i++) {
    list.push(randomPoint());
  }
  return list;
}

function fat(n) {
  return (n <= 0) ? 1 : n * fat(n - 1);
}

function b(i, n, t, p) {
  let point = {};
  let c = (fat(n) / (fat(i) * fat(n - i)));
  point.x = c * Math.pow(1 - t, n - i) * Math.pow(t, i) * p.x;
  point.y = c * Math.pow(1 - t, n - i) * Math.pow(t, i) * p.y;
  return point;
}

function getPoint(path, t) {
  let p = {
    x: 0,
    y: 0
  }
  for (var i = 0; i < path.length; i++) {
    p.x += b(i, path.length - 1, t, path[i]).x;
    p.y += b(i, path.length - 1, t, path[i]).y;
  }
  return p;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < claudios.length; i++) {
    if (sounds[claudios[i].n].playing(claudios[i].id)) {
      ctx.drawImage(img, claudios[i].x - (img.width / 2), claudios[i].y - (img.height / 2));
    }
  }
}

function update() {
  for (var i = 0; i < claudios.length; i++) {
    let t1 = sounds[claudios[i].n].seek(claudios[i].id);
    let t2 = sounds[claudios[i].n].duration();
    let t = t1 / t2;
    let point = getPoint(claudios[i].path, t);
    claudios[i].x = point.x;
    claudios[i].y = point.y;
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
    id: sounds[newNumber].play(),
    path: [
      {
        x: e.offsetX,
        y: e.offsetY
      },
      ...randomPoints(3)
    ]
  });
});

setInterval(() => {
  draw();
  update();
  clear();
}, 1000 / 60);
