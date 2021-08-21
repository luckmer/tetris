import { GlobalData } from "../constants/GlobalData";
import { action } from "../map/create";

export const Timer = () => {
  const timer = setInterval(() => {
    if (!GlobalData.blockMove) {
      action.moveDown();
    }
  }, 500 / (GlobalData.level + 1));

  action.moveDown();

  return timer;
};
