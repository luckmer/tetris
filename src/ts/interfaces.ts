export type mutation = (v: HTMLDivElement) => boolean;
export type mutatesWall = (v: number) => boolean;

export interface piecesMap {
  [key: string]: {
    matrix: number[][];
    color: string;
  };
}
