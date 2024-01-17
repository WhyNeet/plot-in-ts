import { Entity, DrawParams } from ".";
import { Axis, Point } from "../types";
import { random, rangeBound } from "../utils";
import { Range } from "../types";

export class Line implements Entity {
  // Start and end coordinates in units.
  constructor(
    private start: Point,
    private end: Point,
    private thickness = 1,
    private randomColor = false
  ) {}

  public draw({ ctx, resolution, unitsToPixels }: Omit<DrawParams, "scale">) {
    if (this.randomColor)
      ctx.strokeStyle = `rgb(${random([0, 180])}, ${random([0, 180])}, ${random(
        [0, 180]
      )})`;

    ctx.lineWidth = this.thickness * resolution;

    ctx.beginPath();
    ctx.moveTo(
      unitsToPixels(this.start.x),
      unitsToPixels(this.start.y, Axis.Y)
    );
    ctx.lineTo(unitsToPixels(this.end.x), unitsToPixels(this.end.y, Axis.Y));
    ctx.stroke();
  }

  public static vertical(x: number, range: Range | number): Line {
    return new Line(
      { x, y: rangeBound(range, 0) },
      { x, y: rangeBound(range, 1) }
    );
  }

  public static horizontal(y: number, range: Range | number): Line {
    return new Line(
      { x: rangeBound(range, 0), y },
      { x: rangeBound(range, 1), y }
    );
  }
}
