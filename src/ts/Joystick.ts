import { action } from "./create";

export class Joystick {
  public control(event: KeyboardEvent) {
    let code = event.keyCode;
    switch (code) {
      case 38:
        action.rotate();
        break;

      case 39:
        action.moveRight();
        break;

      case 37:
        action.moveLeft();
        break;

      case 40:
        action.moveDown();
        break;
      case 32:
        action.hardDrop();
        break;
    }
  }
}
