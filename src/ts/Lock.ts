import { GlobalData } from "./GlobalData";
import { helper, div } from "./create";

export const Lock = (rotation: number[]) => {
  const CalcPosition = rotation.map((el: number) => el + GlobalData.down);
  const rightWall = CalcPosition.map((el: number) => el % 10).slice(-2);
  const isAtLeftEdge = rotation.some(
    (index: number) => (GlobalData.down + index) % 10 === 0
  );

  const isAtRightEdge = rotation.some(
    (index: number) => (GlobalData.down + index) % 10 === 10 - 1
  );

  const leftBlock = helper.filterFunc(
    div,
    (v: HTMLDivElement) => Number(v.id) % 10 === 0
  );

  const rightBlock = helper.filterFunc(
    div,
    (v: HTMLDivElement) => Number(v.id) % 10 === 9
  );

  const rightCollision = rightBlock.some((el) => CalcPosition.includes(el));
  const leftCollision = leftBlock.some((el) => CalcPosition.includes(el));
  const [x, y] = rightWall;

  if (
    (x === 8 && y === 9 && isAtRightEdge && leftCollision) ||
    (x === 0 && y === 1 && isAtRightEdge && leftCollision) ||
    (x === 9 && y === 0 && isAtRightEdge) ||
    (x === 1 && y === 1 && isAtLeftEdge && rightCollision) ||
    (x === 1 && y === 2 && isAtLeftEdge && rightCollision) ||
    (x === 1 && y === 0 && isAtLeftEdge && rightCollision)
  )
    return false;

  return true;
};
