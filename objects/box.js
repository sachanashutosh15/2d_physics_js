import Vector from "../concepts/vector.js";
import { ctx, objectsList, objectsMap } from "../scripts.js";
import Utilities from "../utilities.js";

export default class Box {
  constructor (x, y, height, width, mass) {
    this.controlState = {
      up: false,
      right: false,
      bottom: false,
      left: false,
      clockWise: false,
      antiClockWise: false
    }
    this.position = new Vector(x, y);
    this.height = height;
    this.width = width;
    this.mass = mass;
    this.velocity = new Vector(0, 0);
    this.acceleration = Utilities.controlStateToAcc(this.controlState);
    objectsList.push(this);
    objectsMap.boxes.push(this);
  }

  refreshVelocity() {
    this.velocity = this.velocity.add(this.acceleration.scalarMult(1 / this.mass));
  }

  refreshPosition() {
    this.position = this.position.add(this.velocity);
  }

  draw() {
    ctx.value.fillRect(this.position.x, this.position.y, this.width, this.height);
    this.refreshPosition();
  }
}
