import { GlobalData } from "../constants/GlobalData";

export const BlockCollisions = (current: number[], div: HTMLDivElement[]) => {
  const curr = current;

  const calcPosition = curr.map((el) => el + GlobalData.down);

  const blockCollision = calcPosition.some((el) => {
    return div[el].classList.contains("end");
  });

  return blockCollision;
};
