import { mutation, mutatesWall } from "./interfaces";

export class helpers {
  filterFunc = (arr: HTMLDivElement[], mutate: mutation) =>
    arr.filter(mutate).map(({ id }) => Number(id));

  endBlocks = (arr: HTMLDivElement[], mutate: mutation) => arr.filter(mutate);

  wallEnd = (arr: number[], mutate: mutatesWall) => arr.some(mutate);
}
