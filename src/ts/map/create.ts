import { level, score, lines, endGame } from "../constants/html";
import { CollisionHelpers } from "../collision/CollisionHelpers";
import { BlockCollisions } from "../collision/BlockCollisions";
import { GlobalData } from "../constants/GlobalData";
import { movement } from "../joystick/movement";
import { pieces } from "../constants/constants";
import { helpers } from "../constants/helpers";
import { Timer } from "../joystick/Timer";
import { Lock } from "../collision/Lock";
import { createMap } from "./createMap";
import { joystick } from "../index";
import { rows } from "./rows";

export const create = new createMap();
export const helper = new helpers();
export const grid = create.map();
export let div = Array.from(grid!.querySelectorAll("div"));
export let random = create.randomizePiece(pieces);
export let current = random.matrix[GlobalData.rotates];

const move = new movement();

export class JoystickMove {
  rotate = () => {
    const rotator = GlobalData.rotates === 3 ? 0 : GlobalData.rotates + 1;
    const rotation = random.matrix[rotator];

    if (rotation) {
      if (!Lock(rotation)) return;

      GlobalData.rotates === 3
        ? (GlobalData.rotates = 0)
        : GlobalData.rotates++;

      move.deleteStarterBlock();
      current = random.matrix[GlobalData.rotates];
      move.renderStarterBlock();
    }
  };

  moveLeft = () => {
    const leftWall = helper.wallEnd(
      current,
      (v: number) => (GlobalData.down + v) % 10 === 0
    );

    if (leftWall) return;

    move.deleteStarterBlock();
    GlobalData.down -= 1;

    const blockCollision = BlockCollisions(current, div);

    if (blockCollision) GlobalData.down += 1;

    move.renderStarterBlock();
  };

  moveDown = () => {
    move.deleteStarterBlock();
    GlobalData.down += 10;
    move.renderStarterBlock();
    Collision();
  };

  moveRight = () => {
    const rightWall = helper.wallEnd(
      current,
      (v: number) => (GlobalData.down + v) % 10 === 9
    );

    if (rightWall) return;

    move.deleteStarterBlock();
    GlobalData.down += 1;
    const blockCollision = BlockCollisions(current, div);

    if (blockCollision) GlobalData.down -= 1;

    move.renderStarterBlock();
  };

  stopGame(status: boolean) {
    if (status) {
      document?.removeEventListener("keydown", joystick.control);
    } else document?.addEventListener("keydown", joystick.control);
    GlobalData.blockMove = status;
  }
  reset() {
    GlobalData.down = 3;
    GlobalData.rotates = 0;
    GlobalData.gameOver = false;
    GlobalData.score = 0;
    GlobalData.lines = 0;
    GlobalData.level = 0;
    GlobalData.stop = false;
    GlobalData.LINE_LEVEL_INCREMENT = 3;
    div.forEach((el) => {
      el.style.backgroundColor = "";
      el.classList.remove("block1");
      el.classList.remove("end");
    });
    endGame.classList.remove("display");
    document?.addEventListener("keydown", joystick.control);
    HTMLDisplay();
  }

  playerDrop() {
    move.deleteStarterBlock();
    GlobalData.down += 10;
    move.renderStarterBlock();

    if (!Collision()) return false;
    return true;
  }

  hardDrop() {
    while (this.playerDrop()) {}
  }
}

export const action = new JoystickMove();

const Collision = () => {
  const { End, Start, collide, randomize } = CollisionHelpers(div, random);

  EndGameCollision(End, Start);

  if (collide || End) {
    current.forEach(
      (index) => (div[index + GlobalData.down].className = "grid end")
    );

    GlobalData.down = 3;

    random = randomize;

    current = randomize.matrix[GlobalData.rotates];

    move.renderStarterBlock();

    for (let j = 0; j < 200; j += 10) {
      const row = rows(j);
      if (row.every((index) => div[index].classList.contains("end"))) {
        setTimeout(() => {
          row.forEach((index) => {
            div[index].style.background = "";
            div[index].classList.remove("end");
          });

          const calcLevel =
            Math.floor(GlobalData.lines / GlobalData.LINE_LEVEL_INCREMENT) + 1;

          GlobalData.score += 10;
          GlobalData.lines += 1;
          GlobalData.level = calcLevel;

          const squaresRemoved = div.splice(j, 10);
          div = squaresRemoved.concat(div);
          div.forEach((cell: HTMLDivElement) => grid?.appendChild(cell));
          HTMLDisplay();
        }, 100);
      }
    }
    return false;
  }
  return true;
};

const EndGameCollision = (End: boolean, Start: boolean) => {
  if (End && Start) {
    GlobalData.gameOver = true;
    document?.removeEventListener("keydown", joystick.control);
    endGame.classList.add("display");
  }
};

const HTMLDisplay = () => {
  level.innerHTML = `${GlobalData.level}`;
  lines.innerHTML = `${GlobalData.lines}`;
  score.innerHTML = `${GlobalData.score}`;
};

Timer();
