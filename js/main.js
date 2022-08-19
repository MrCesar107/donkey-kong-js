const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let player;
let animationId;

// Entities classess
class Entity {
  constructor(x, y, width, height, color = "#fff") {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Player extends Entity {
  constructor(x, y, width, height, color = "#fff") {
    super(x, y, width, height, color);
    this.speed = 5;
    this.direction = "none";
  }

  update() {
    addEventListener("keydown", (event) => {
      if (event.code === "ArrowRight") this.direction = "right";
      else if (event.code === "ArrowLeft") this.direction = "left";
      else if (event.code === "ArrowUp") this.direction = "up";
      else if (event.code === "ArrowDown") this.direction = "down";
    });

    addEventListener("keyup", () => {
      this.direction = "none";
    });

    this.move();
  }

  move() {
    switch (this.direction) {
      case "right":
        this.x += this.speed;
        break;
      case "left":
        this.x -= this.speed;
        break;
      case "up":
        this.y -= this.speed;
        break;
      case "down":
        this.y += this.speed;
        break;
    }
  }
}

resizeCanvas();
init();

addEventListener("resize", resizeCanvas);

function resizeCanvas() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  clearCanvas();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function init() {
  player = new Player(canvas.width / 2, canvas.height / 2, 32, 32, "#FF0000");
  startGame();
}

function startGame() {
  animate();
}

function draw() {
  drawEntities();
}

function update() {
  updateEntities();
}

function animate() {
  animationId = requestAnimationFrame(animate);
  clearCanvas();
  update();
  draw();
}

function drawEntities() {
  player.draw();
}

function updateEntities() {
  player.update();
}
