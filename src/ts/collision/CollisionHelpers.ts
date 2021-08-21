import { GlobalData } from "../constants/GlobalData";
import { pieces } from "../constants/constants";
import { helper, create } from "../map/create";

export const CollisionHelpers = (
  div: HTMLDivElement[],
  random: {
    matrix: number[][];
    color: string;
  }
) => {
  const end = helper.endBlocks(div, -10);

  const start = helper.startBlocks(div, 10);

  const curr = random.matrix[GlobalData.rotates];

  const calcPosition = curr.map((el) => el + GlobalData.down);

  const randomize = create.randomizePiece(pieces);

  const collide = calcPosition.some((el) => end.includes(Number(div[el].id)));

  const End = calcPosition.some(
    (el) => div[el + 10] && div[el + 10].classList.contains("end")
  );

  const Start = calcPosition.some((el) =>
    start.includes(Number(div[el].id) - 4)
  );

  return { End, Start, collide, randomize };
};
