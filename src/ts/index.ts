import { Joystick } from "./joystick/Joystick";
import { buttons } from "./constants/html";

export const joystick = new Joystick();

buttons.forEach((button) =>
  button.addEventListener("click", joystick.mouseControl)
);

document?.addEventListener("keydown", joystick.control);

// add status about game pause
