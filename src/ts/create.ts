import { level, score, lines } from "./html";
import { GlobalData } from "./GlobalData";
import { createMap } from "./createMap";
import { pieces } from "./constants";
import { helpers } from "./helpers";
import { joystick } from "./index";
import { Lock } from "./Lock";

export const create = new createMap();
export const helper = new helpers();
export const grid = create.map();
export let div = Array.from(grid!.querySelectorAll("div"));
export let random = create.randomizePiece(pieces);
export let current = random.matrix[GlobalData.rotates];

class movement {
  renderStarterBlock = () => {
    current.forEach((index: number) => {
      div[GlobalData.down + index].classList.add("block1");
      div[GlobalData.down + index].style.background = random.color;
    });
  };

  deleteStarterBlock = () => {
    current.forEach((index: number) => {
      div[GlobalData.down + index].classList.remove("block1");
      div[GlobalData.down + index].style.background = "";
    });
  };
}

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
    move.renderStarterBlock();
  };

  playerDrop() {
    move.deleteStarterBlock();
    GlobalData.down += 10;
    move.renderStarterBlock();

    if (!Collision()) {
      return false;
    }
    return true;
  }

  hardDrop() {
    while (this.playerDrop()) {}
  }
}

export const action = new JoystickMove();

const Collision = () => {
  const end = helper.endBlocks(div, -10);
  const start = helper.startBlocks(div, 10);
  const curr = random.matrix[GlobalData.rotates];

  if (curr) {
    const calcPosition = curr.map((el) => el + GlobalData.down);
    const randomize = create.randomizePiece(pieces);
    const collide = calcPosition.some((el) => {
      const check = Number(div[el].id);
      return end.includes(check);
    });

    const End = calcPosition.some((el) => {
      const block = div[el + 10] && div[el + 10].classList.contains("end");

      return block;
    });

    const Start = calcPosition.some((el) => {
      const check = Number(div[el].id);
      return start.includes(check - 2);
    });

    if (End && Start) {
      clearInterval(timer);
      document?.removeEventListener("keydown", joystick.control);
    }

    if (collide || End) {
      current.forEach(
        (index) => (div[index + GlobalData.down].className = "grid end")
      );

      GlobalData.down = 0;
      random = randomize;
      current = randomize.matrix[GlobalData.rotates];
      move.renderStarterBlock();
      for (let j = 0; j < 200; j += 10) {
        const row = [
          j,
          j + 1,
          j + 2,
          j + 3,
          j + 4,
          j + 5,
          j + 6,
          j + 7,
          j + 8,
          j + 9,
        ];
        if (row.every((index) => div[index].classList.contains("end"))) {
          row.forEach((index) => {
            div[index].style.background = "";
            div[index].classList.remove("end");
          });

          GlobalData.score += 10;
          GlobalData.lines += 1;
          GlobalData.level =
            Math.floor(GlobalData.lines / GlobalData.LINE_LEVEL_INCREMENT) + 1;

          const squaresRemoved = div.splice(j, 10);
          div = squaresRemoved.concat(div);
          div.forEach((cell: HTMLDivElement) => grid?.appendChild(cell));
          level.innerHTML = `${GlobalData.level}`;
          lines.innerHTML = `${GlobalData.lines}`;
          score.innerHTML = `${GlobalData.score}`;
        }
      }
      return false;
    }
  }
  return true;
};

const timer = setInterval(() => {
  action.moveDown();
}, 500 / (GlobalData.level + 1));
action.moveDown();
