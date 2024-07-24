import { ctx } from "./scripts.js";
import Vector from "./concepts/vector.js";

export default class Utilities {
  static controlStateToAcc (ctrlState) {
    const acc = new Vector(0, 0);
    if (ctrlState.right) {
      acc.x = 1;
    }
    if (ctrlState.left) {
      acc.x = -1;
    }
    if (ctrlState.up) {
      acc.y = -1;
    }
    if (ctrlState.down) {
      acc.y = 1;
    }
    const result = acc.unit();
    return result;
  }

  static limitZeros(num) {
    return parseInt(num * 1000) / 1000;
  }

  static writeOnScreen(x, y, text) {
    ctx.value.font = "16px Arial";
    ctx.value.fillText(text, x, y);
  }
}