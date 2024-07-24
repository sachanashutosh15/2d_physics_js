import { ctx } from "../../scripts.js";
import Point from "../point.js";
import Vector from "../vector.js";

export default class BallWallInteraction {
  static areColliding(ball, wall) {
    if (this.minimumDistanceVec(ball, wall).magnitude() <= ball.radius) {
      return true;
    } else {
      return false;
    }
  }

  static minimumDistanceVec(ball, wall) {
    const nearestPointOfWall = this.nearestPointOnLine(ball, wall);
    const ballToNearestPtVec = new Vector(nearestPointOfWall.x, nearestPointOfWall.y).add(ball.position.scalarMult(-1));
    return ballToNearestPtVec;
  }

  static nearestPointOnLine(ball, wall) {
    const dStart = wall.start.distanceFrom(new Point(ball.position.x, ball.position.y));
    const dEnd = wall.end.distanceFrom(new Point(ball.position.x, ball.position.y));
    if (dStart > dEnd) {
      return wall.end;
    } else {
      return wall.start;
    }
  }

  static drawTrackers(ball, wall) {
    ctx.value.beginPath();
    ctx.value.moveTo(ball.position.x, ball.position.y);
    ctx.value.lineTo(wall.end.x, wall.end.y);
    ctx.value.stroke();
  }

  static velocityAfterCollision (ball, wall) {
    const wallNormal = wall.normal();
    const velocityAlongNormal = wallNormal.scalarMult(wallNormal.dot(ball.velocity));
    const wallDir = wall.direction;
    const velocityAlongWall = wallDir.scalarMult(wallDir.dot(ball.velocity));
    return velocityAlongWall.add(velocityAlongNormal.scalarMult(-1));
  }

  peneterationResolution() {

  }
}