import { Joystick } from "./Joystick";

export const joystick = new Joystick();
document?.addEventListener("keydown", joystick.control);
