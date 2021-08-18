import { pieces } from "./constants";
import { piecesMap } from "./interfaces";

const randomizePiece = (pieces: piecesMap) => {
  const pKeys = Object.keys(pieces);
  const randKey = pKeys[Math.floor(Math.random() * pKeys.length)];
  return pieces[randKey];
};

const random = randomizePiece(pieces);

const rotate = () => {};
const moveLeft = () => {};
const moveDown = () => {};
const moveRight = () => {};

class Joystick {
  public control(event: KeyboardEvent) {
    let code = event.keyCode;

    switch (code) {
      case 38:
        rotate();
        break;

      case 39:
        moveRight();
        break;

      case 37:
        moveLeft();
        break;

      case 40:
        moveDown();
        break;
    }
  }
}

const joystick = new Joystick();

document?.addEventListener("keydown", joystick.control);
