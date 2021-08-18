import { piecesMap } from "./interfaces";

export const WIDTH: number = 10;
export const HEIGHT: number = 20;

export const backgrounds = [
  "REBECCAPURPLE",
  "BLUEVIOLET",
  "DARKVIOLET",
  "DARKORCHID",
  "DARKMAGENTA",
  "PURPLE",
  "INDIGO",
  "SLATEBLUE",
  "DARKSLATEBLUE",
  "MEDIUMSLATEBLUE",
];

export const pieces: piecesMap = {
  t: {
    matrix: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: "#7F63FF",
  },
  square: {
    matrix: [
      [1, 1],
      [1, 1],
    ],
    color: "#FFEBE3",
  },
  lLeft: {
    matrix: [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
    color: "#5DBF95",
  },
  lRight: {
    matrix: [
      [0, 1],
      [0, 1],
      [1, 1],
    ],
    color: "#FFEDAA",
  },
  crookedLeft: {
    matrix: [
      [0, 1],
      [1, 1],
      [1, 0],
    ],
    color: "#FFFBED",
  },
  crookedRight: {
    matrix: [
      [1, 0],
      [1, 1],
      [0, 1],
    ],
    color: "#92E3C0",
  },
  straight: {
    matrix: [[1], [1], [1], [1]],
    color: "#C2B5FD",
  },
};
