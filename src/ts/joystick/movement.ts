import { GlobalData } from "../constants/GlobalData";
import { current, div, random } from "../map/create";

export class movement {
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
