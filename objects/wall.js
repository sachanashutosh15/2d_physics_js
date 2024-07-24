import Point from "../concepts/point.js";
import Vector from "../concepts/vector.js";
import { ctx, objectsList, objectsMap } from "../scripts.js";
import Utilities from "../utilities.js";

export default class Wall {
  constructor (start, end) {
    this.start = new Point(start.x, start.y);
    this.end = new Point(end.x, end.y);
    this.direction = new Vector(end.x - start.x, end.y - start.y).unit();
    objectsList.push(this);
    objectsMap.walls.push(this);
  }

  draw() {
    ctx.value.beginPath();
    ctx.value.moveTo(this.start.x, this.start.y);
    ctx.value.lineTo(this.end.x, this.end.y);
    ctx.value.strokeStyle = "#000000";
    ctx.value.stroke();
  }

  normal() {
    return new Vector(this.direction.y, - this.direction.x);
  }
}