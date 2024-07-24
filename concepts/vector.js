import Utilities from "../utilities.js";
import { ctx } from "../scripts.js";
import { canvasHeight, canvasWidth } from "../constants.js";

export default class Vector {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  magnitude () {
    return Utilities.limitZeros(Math.sqrt(this.x ** 2 + this.y ** 2));
  }

  add(vec) {
    return new Vector(Utilities.limitZeros(this.x + vec.x), Utilities.limitZeros(this.y + vec.y));
  }

  scalarMult(num) {
    return new Vector(Utilities.limitZeros(this.x * num), Utilities.limitZeros(this.y * num));
  }

  dot(vec) {
    return vec.x * this.x + vec.y * this.y;
  }

  unit() {
    if (this.magnitude() == 0) {
      return this;
    } else {
      return this.scalarMult(1 / this.magnitude());
    }
  }

  static draw(position, vector) {
    ctx.value.beginPath();
    ctx.value.moveTo(position.x, position.y); 
    ctx.value.lineTo(position.x + vector.x, position.y + vector.y);
    ctx.value.stroke();
  }

  areParallel(vec) {
    if (vec.x / this.x === vec.y / this.y) {
      return true;
    } else {
      return false;
    }
  }
}
