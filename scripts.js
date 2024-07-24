import Box from "./objects/box.js";
import KeyControl from "./controller.js";
import Ball from "./objects/ball.js";
import Wall from "./objects/wall.js";
import Vector from "./concepts/vector.js";
import { canvasHeight, canvasWidth } from "./constants.js";
import BallWallInteraction from "./concepts/interactions/ballWall.js";
import Utilities from "./utilities.js";

const ctx = {
  value: null
}

const objectsList = [];
const objectsMap = {
  balls: [],
  boxes: [],
  walls: []
}

const borderWidth = 5;
const frictionCoeff = 0.04;

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const context = canvas.getContext("2d");
  ctx.value = context;


  // ---------elements----------
  const box = new Box(100, 100, 100, 100, 5);
  const ball = new Ball(400, 300, 50, 4);
  const topWall = new Wall(new Vector(borderWidth, borderWidth), new Vector(canvasWidth - borderWidth, borderWidth));
  const rightWall = new Wall(new Vector(canvasWidth - borderWidth, borderWidth), new Vector(canvasWidth - borderWidth, canvasHeight - borderWidth));
  const bottomWall = new Wall(new Vector(canvasWidth - borderWidth, canvasHeight - borderWidth), new Vector(borderWidth, canvasHeight - borderWidth));
  const leftWall = new Wall(new Vector(borderWidth, canvasWidth - borderWidth), new Vector(borderWidth, borderWidth));
  const newWall = new Wall(new Vector(100, 200), new Vector(500, 100))
  // ---------------------------
  KeyControl.initKeyControls(document, ball);

  let lastTimeStamp = 0;
  const frameDuration = 1000 / 100;

  function drawObjects() {
    ctx.value.clearRect(0, 0, canvasWidth, canvasHeight);
    const objectNames = Object.keys(objectsMap);
    for (let objName of objectNames) {
      const objList = objectsMap[objName];
      objList.forEach((obj) => {
        obj.draw();
      })
    }
  }

  function refreshObjects() {
    objectsMap.balls.forEach((ball) => {
      ball.refreshPosition();
      ball.refreshVelocity();
      ball.checkCollisionWithWalls(objectsMap.walls);
      ball.velocity = ball.velocity.scalarMult(1 - frictionCoeff);
    })
  }

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTimeStamp;
    if (deltaTime > frameDuration) {
      drawObjects();
      refreshObjects();
      lastTimeStamp = timeStamp;
    }
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
})

export {
  ctx,
  objectsList,
  objectsMap
};