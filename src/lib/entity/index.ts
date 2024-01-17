import { Axis } from "../types";

export interface Entity {
  draw: (params: DrawParams) => void;
}

export interface DrawParams {
  ctx: CanvasRenderingContext2D;
  resolution: number;
  scale: number;
  unitsToPixels: (units: number, axis?: Axis, absolute?: boolean) => number;
}

export type SimpleDrawParams = Omit<Omit<DrawParams, "scale">, "resolution">;
