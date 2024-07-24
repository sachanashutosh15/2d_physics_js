import Vector from "../concepts/vector.js";
import Utilities from "../utilities.js";
import { ctx, objectsMap } from "../scripts.js";
import BallWallInteraction from "../concepts/interactions/ballWall.js";

export default class Ball {
  constructor (x, y, r, mass) {
    this.controlState = {
      up: false,
      right: false,
      bottom: false,
      left: false,
      clockWise: false,
      antiClockWise: false
    }
    this.position = new Vector(x, y);
    this.radius = r;
    this.mass = mass;
    this.velocity = new Vector(0, 0);
    this.acceleration = Utilities.controlStateToAcc(this.controlState);
    objectsMap.balls.push(this);
  }

  refreshVelocity() {
    this.velocity = this.velocity.add(this.acceleration.scalarMult(1 / this.mass));
  }

  refreshPosition() {
    this.position = this.position.add(this.velocity);
  }

  checkCollisionWithWalls(walls) {
    walls.forEach((wall) => {
      const isColliding = BallWallInteraction.areColliding(this, wall);
      if (isColliding) {
        Utilities.writeOnScreen(20, 20, isColliding.toString());
        this.handleCollision(wall);
      }
      Vector.draw(this.position, BallWallInteraction.minimumDistanceVec(this, wall));
    })
  }

  draw() {
    ctx.value.beginPath();
    ctx.value.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.value.fillStyle = "red";
    ctx.value.fill();
  }

  handleCollision(wall) {
    this.velocity = BallWallInteraction.velocityAfterCollision(this, wall);
  }
}
