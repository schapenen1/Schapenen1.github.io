/*
  Processing → JavaScript (p5.js)
  Original authors: Daniel Chiapparini, Lars Gerritsen
*/

// ===================== GLOBALS =====================
let game;
let currentScreen = "start";

function preload() {
  // assets loaded in classes if needed
}

function setup() {
    let cnv = createCanvas(1280, 720);
  cnv.parent("canvas-container"); // This puts the canvas in the correct place
  
  game = new GameMechanics();
}

function draw() {
  background(0);

  if (currentScreen === "start") {
    game.startingScreen.display();
  } else if (currentScreen === "game") {
    game.update();
    game.display();
  } else if (currentScreen === "win") {
    game.victoryScreen.display();
  } else if (currentScreen === "lose") {
    game.losingScreen.display();
  }
}

function mousePressed() {
  if (currentScreen === "start") currentScreen = "game";
  game.mousePressed();
}

function mouseReleased() {
  game.mouseReleased();
}

// ===================== GAME MECHANICS =====================
class GameMechanics {
  constructor() {
    this.catapult = new Catapult(250, 500);
    this.ball = new Ball(this.catapult.x, this.catapult.y);
    this.blocks = [];
    this.background = new Background();

    this.startingScreen = new StartingScreen();
    this.victoryScreen = new VictoryScreen();
    this.losingScreen = new LosingScreen();

    for (let i = 0; i < 5; i++) {
      this.blocks.push(new Block(800 + i * 60, 550));
    }
  }

  update() {
    this.ball.update();

    for (let b of this.blocks) {
      if (!b.destroyed && b.hit(this.ball)) {
        b.destroyed = true;
      }
    }

    if (this.blocks.every(b => b.destroyed)) {
      currentScreen = "win";
    }

    if (this.ball.pos.y > height) {
      currentScreen = "lose";
    }
  }

  display() {
    this.background.display();
    this.catapult.display();
    this.ball.display();
    for (let b of this.blocks) b.display();
  }

  mousePressed() {
    this.catapult.startDrag();
  }

  mouseReleased() {
    this.catapult.release(this.ball);
  }
}

// ===================== CATAPULT =====================
class Catapult {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dragging = false;
  }

  startDrag() {
    this.dragging = true;
  }

  release(ball) {
    if (this.dragging) {
      let force = p5.Vector.sub(
        createVector(this.x, this.y),
        createVector(mouseX, mouseY)
      );
      force.mult(0.15);
      ball.applyForce(force);
    }
    this.dragging = false;
  }

  display() {
    if (this.dragging) {
      stroke(255);
      line(this.x, this.y, mouseX, mouseY);
    }
  }
}

// ===================== BALL =====================
class Ball {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = 20;
  }

  applyForce(f) {
    this.acc.add(f);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.vel.y += 0.4; // gravity
  }

  display() {
    fill(255, 0, 0);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}

// ===================== BLOCK =====================
class Block {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 50;
    this.destroyed = false;
  }

  hit(ball) {
    return (
      ball.pos.x > this.x &&
      ball.pos.x < this.x + this.w &&
      ball.pos.y > this.y &&
      ball.pos.y < this.y + this.h
    );
  }

  display() {
    if (this.destroyed) return;
    fill(200);
    rect(this.x, this.y, this.w, this.h);
  }
}

// ===================== SCREENS =====================
class StartingScreen {
  display() {
    fill(255);
    textAlign(CENTER);
    textSize(48);
    text("CLICK TO START", width / 2, height / 2);
  }
}

class VictoryScreen {
  display() {
    fill(0, 255, 0);
    textAlign(CENTER);
    textSize(48);
    text("YOU WIN!", width / 2, height / 2);
  }
}

class LosingScreen {
  display() {
    fill(255, 0, 0);
    textAlign(CENTER);
    textSize(48);
    text("YOU LOSE!", width / 2, height / 2);
  }
}

// ===================== BACKGROUND =====================
class Background {
  display() {
    background(135, 206, 235);
    fill(100, 200, 100);
    rect(0, height - 100, width, 100);
  }
}
