export default class Point {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  distanceFrom(point) {
    return Math.sqrt((point.x - this.x) ** 2 + (point.y - this.y) ** 2);
  }
}