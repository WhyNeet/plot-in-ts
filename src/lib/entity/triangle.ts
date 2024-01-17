import { Entity, SimpleDrawParams } from ".";
import { Point } from "../types";

export class Triangle implements Entity {
  constructor(private anchor: Point, private size: Point) {}

  public draw({ ctx, unitsToPixels }: SimpleDrawParams) {
    const start = {
      x: unitsToPixels(this.anchor.x),
      y: unitsToPixels(this.anchor.y),
    };
    const middle = {
      x: unitsToPixels(this.anchor.x + this.size.x),
      y: unitsToPixels(this.anchor.y),
    };
    const end = {
      x: unitsToPixels(this.anchor.x + this.size.x / 2),
      y: unitsToPixels(this.anchor.y + this.size.y),
    };

    ctx.fillStyle = "black";

    ctx.beginPath();

    ctx.moveTo(start.x, start.y);
    ctx.lineTo(middle.x, middle.y);
    ctx.lineTo(end.x, end.y);
    ctx.lineTo(start.x, start.y);

    ctx.fill();
  }
}
