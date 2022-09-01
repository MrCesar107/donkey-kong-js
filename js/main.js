const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let player;
let platforms = [];
let animationId;

// Entities classess
class Entity {
  constructor(x, y, dy, width, height, color = "#fff") {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  isColliding(entity) {
    return (
      this.x < entity.x + entity.width &&
      this.x + this.width > entity.x &&
      this.y < entity.y + entity.height &&
      this.height + this.y > entity.y
    );
  }
}

class Player extends Entity {
  constructor(x, y, dy, width, height, color = "#fff") {
    super(x, y, dy, width, height, color);
    this.speed = 5;
    this.gravity = 0.25;
    this.canJump = true;
    this.keyboard = [];
    this.setupKeyboard();
  }

  update() {
    this.move();
    this.checkCollisions();
  }

  setupKeyboard() {
    document.addEventListener("keydown", (e) => {
      this.keyboard[e.code] = true;
    });

    document.addEventListener("keyup", (e) => {
      this.keyboard[e.code] = false;
    });
  }

  move() {
    if (this.keyboard["ArrowRight"]) this.x += this.speed;
    if (this.keyboard["ArrowLeft"]) this.x -= this.speed;
    if (this.keyboard["Space"]) this.jump();

    this.dy += this.gravity;
    this.y += this.dy;
  }

  jump() {
    if (this.canJump) {
      this.dy = -5;
      this.canJump = false;
    }
  }

  checkCollisions() {
    this.checkScreenCollisions();
  }

  checkScreenCollisions() {
    if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;
    if (this.x < 0) this.x = 0;
    if (this.y + this.height > canvas.height)
      this.y = canvas.height - this.height;
    if (this.y < 0) this.y = 0;

    platforms.forEach((platform) => {
      if (this.isColliding(platform)) {
        this.dy = 0;
        this.y = platform.y - this.height;
        this.canJump = true;
      }
    });
  }
}

class Platform extends Entity {
  constructor(x, y, width, height, color = "#ff0000") {
    super(x, y, 0, width, height, color);
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
  player = new Player(170, canvas.height - 130, 2, 32, 32, "#EDF50C");
  generatePlatforms();
  startGame();
}

function generatePlatforms() {
  platforms.push(new Platform(0, canvas.height - 32, canvas.width, 32));
  platforms.push(new Platform(0, canvas.height - 192, canvas.width - 256, 32));
  platforms.push(
    new Platform(256, canvas.height - 352, canvas.width - 256, 32)
  );
  platforms.push(new Platform(0, canvas.height - 512, canvas.width - 256, 32));
  platforms.push(new Platform(0, canvas.height - 704, canvas.width - 256, 32));
  platforms.push(
    new Platform(canvas.width / 2 - 200, canvas.height - 864, 300, 32)
  );
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
  drawPlatforms();
  player.draw();
}

function drawPlatforms() {
  platforms.forEach((platform) => {
    platform.draw();
  });
}

function updateEntities() {
  player.update();
}
