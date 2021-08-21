import { action } from "../map/create";
import { GlobalData } from "../constants/GlobalData";

export class Joystick {
  public mouseControl = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    switch (value) {
      case "up":
        if (!GlobalData.stop) action.rotate();
        break;

      case "right":
        if (!GlobalData.stop) action.moveRight();
        break;

      case "left":
        if (!GlobalData.stop) action.moveLeft();
        break;

      case "down":
        if (!GlobalData.stop) action.moveDown();
        break;

      case "drop":
        if (!GlobalData.stop) action.hardDrop();
        break;

      case "reset":
        GlobalData.stop = false;
        action.reset();
        break;

      case "pause/resume":
        GlobalData.stop = !GlobalData.stop;
        action.stopGame(GlobalData.stop);
        break;

      default:
        break;
    }
  };

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
