import { DrawParams, Entity } from ".";
import { Axis, Point } from "../types";

export enum FontWeight {
  Normal,
  Bold,
}

export class Text implements Entity {
  constructor(
    private text: string,
    private style: { weight?: FontWeight; size: number },
    private position: Point
  ) {}

  public draw({ ctx, resolution, unitsToPixels }: Omit<DrawParams, "scale">) {
    ctx.font = `${this.style.weight === FontWeight.Bold ? "bold" : ""} ${
      this.style.size * resolution
    }px sans-serif`;
    ctx.fillText(
      this.text,
      unitsToPixels(this.position.x),
      unitsToPixels(this.position.y, Axis.Y)
    );
  }
}
