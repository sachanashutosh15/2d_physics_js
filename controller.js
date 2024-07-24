import Utilities from "./utilities.js";

export default class KeyControl {
  static initKeyControls (htmlElement, controlledObj) {
    console.log("keyControl initialized...");
    htmlElement.addEventListener("keydown", (e) => {
      if (e.code == "KeyW") {
        controlledObj.controlState.up = true;
      }
      if (e.code == "KeyS") {
        controlledObj.controlState.down = true;
      }
      if (e.code == "KeyA") {
        controlledObj.controlState.left = true;
      }
      if (e.code == "KeyD") {
        controlledObj.controlState.right = true;
      }
      if (e.code == "ArrowLeft") {
        controlledObj.controlState.antiClockWise = true;
      }
      if (e.code == "ArrowRight") {
        controlledObj.controlState.clockWise = true;
      }
      controlledObj.acceleration = Utilities.controlStateToAcc(controlledObj.controlState);
    })

    htmlElement.addEventListener("keyup", (e) => {
      if (e.code == "KeyW") {
        controlledObj.controlState.up = false;
      }
      if (e.code == "KeyS") {
        controlledObj.controlState.down = false;
      }
      if (e.code == "KeyA") {
        controlledObj.controlState.left = false;
      }
      if (e.code == "KeyD") {
        controlledObj.controlState.right = false;
      }
      if (e.code == "ArrowLeft") {
        controlledObj.controlState.antiClockWise = false;
      }
      if (e.code == "ArrowRight") {
        controlledObj.controlState.clockWise = false;
      }
      controlledObj.acceleration = Utilities.controlStateToAcc(controlledObj.controlState);
    })
  }
}
