import { mutation, mutatesWall } from "./interfaces";

export class helpers {
  filterFunc = (arr: HTMLDivElement[], mutate: mutation) =>
    arr.filter(mutate).map(({ id }) => Number(id));

  endBlocks = (arr: HTMLDivElement[], mutate: number) =>
    arr.slice(mutate).map(({ id }) => Number(id));

  startBlocks = (arr: HTMLDivElement[], mutate: number) =>
    arr.slice(0, mutate).map(({ id }) => Number(id));

  wallEnd = (arr: number[], mutate: mutatesWall) => arr.some(mutate);
}
