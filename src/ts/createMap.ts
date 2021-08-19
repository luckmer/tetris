import { piecesMap } from "./interfaces";
import { HEIGHT, WIDTH } from "./constants";

export class createMap {
  randomizePiece = (pieces: piecesMap) => {
    const pKeys = Object.keys(pieces);
    const randKey = pKeys[Math.floor(Math.random() * pKeys.length)];
    return pieces[randKey];
  };

  map = () => {
    const grid = document.querySelector(".game_display");
    if (grid) {
      const size = ~~(WIDTH * HEIGHT);

      for (let i = 0; i < size; i++) {
        const div = document.createElement("div");
        div.classList.add("grid");
        div.id = i.toString();
        grid.appendChild(div);
      }

      return grid;
    }
  };
}
