import { Point, Range } from "./types";

export function rangeBound(range: Range | number, bound: 0 | 1): number {
  return typeof range === "number" ? (bound ? range : -range) : range[bound];
}

export function numberPoint(num: number): Point {
  return { x: num, y: num };
}

export function random(range: Range): number {
  return Math.floor(Math.random() * (range[1] - range[0])) + range[0];
}
