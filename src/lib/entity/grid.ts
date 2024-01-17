import { DrawParams, Entity } from ".";
import { Line } from "./line";

export class Grid implements Entity {
  constructor() {}

  public draw({ ctx, resolution, scale, unitsToPixels }: DrawParams) {
    ctx.strokeStyle = "lightgray";
    ctx.lineWidth = resolution;

    for (let i = 1; i <= scale; i++) {
      const isDashed = Boolean(i % 2);

      if (isDashed) ctx.setLineDash([5 * resolution, 5 * resolution]);

      const vert = [Line.vertical(i, scale), Line.vertical(-i, scale)] as const;
      vert[0].draw({ ctx, resolution, unitsToPixels });
      vert[1].draw({ ctx, resolution, unitsToPixels });

      const horiz = [
        Line.horizontal(i, scale),
        Line.horizontal(-i, scale),
      ] as const;
      horiz[0].draw({ ctx, resolution, unitsToPixels });
      horiz[1].draw({ ctx, resolution, unitsToPixels });

      ctx.setLineDash([]);
    }
  }
}
