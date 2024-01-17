import { DrawParams, Entity } from ".";
import { deg2rad } from "@/lib/transform/utils";
import { numberPoint } from "../utils";
import { Line } from "./line";
import { Triangle } from "./triangle";
import { FontWeight, Text } from "./text";
import { Axis as Direction } from "../types";

export class Axis implements Entity {
  public draw({ ctx, resolution, scale, unitsToPixels }: DrawParams) {
    const arrowSize = 0.1 * resolution;

    ctx.strokeStyle = "black";

    // Y axis

    const arrowUp = new Triangle(
      { x: -arrowSize / 2, y: 10 - arrowSize },
      numberPoint(arrowSize)
    );
    arrowUp.draw({
      ctx,
      unitsToPixels: (units) => unitsToPixels(units, Direction.Y, true),
    });

    const vertical = Line.vertical(0, [-scale, scale + 0.55 - arrowSize]);
    vertical.draw({ ctx, resolution, unitsToPixels });

    const yLabel = new Text(
      "y",
      { size: 24, weight: FontWeight.Bold },
      { x: 0.4, y: 10 }
    );
    yLabel.draw({ ctx, resolution, unitsToPixels });

    // X axis

    const arrowRight = new Triangle(
      { x: -arrowSize / 2, y: 10 - arrowSize },
      numberPoint(arrowSize)
    );
    ctx.save();
    ctx.rotate(deg2rad(-90));
    arrowRight.draw({
      ctx,
      unitsToPixels: (units) => unitsToPixels(units, Direction.X, true),
    });
    ctx.restore();

    const horizontal = Line.horizontal(0, [-scale, scale + 0.55 - arrowSize]);
    horizontal.draw({ ctx, resolution, unitsToPixels });

    const xLabel = new Text(
      "x",
      { size: 24, weight: FontWeight.Bold },
      { x: 10, y: 0.4 }
    );
    xLabel.draw({ ctx, resolution, unitsToPixels });

    // Ticks and numbers

    for (let i = 1; i <= scale; i++) {
      const tickHeight = i % 2 ? 0.15 : 0.2;

      const horiz = [
        new Line({ x: i, y: -tickHeight }, { x: i, y: tickHeight }),
        new Line({ x: -i, y: -tickHeight }, { x: -i, y: tickHeight }),
      ] as const;
      horiz[0].draw({ ctx, resolution, unitsToPixels });
      horiz[1].draw({ ctx, resolution, unitsToPixels });

      const vert = [
        new Line({ x: -tickHeight, y: i }, { x: tickHeight, y: i }),
        new Line({ x: -tickHeight, y: -i }, { x: tickHeight, y: -i }),
      ] as const;
      vert[0].draw({ ctx, resolution, unitsToPixels });
      vert[1].draw({ ctx, resolution, unitsToPixels });

      if (i % 2 !== 0) continue;

      ctx.textAlign = "center";
      const horizLabels = [
        new Text(i.toString(), { size: 18 }, { x: i, y: -0.8 }),
        new Text((-i).toString(), { size: 18 }, { x: -i, y: -0.8 }),
      ] as const;
      horizLabels[0].draw({ ctx, resolution, unitsToPixels });
      horizLabels[1].draw({ ctx, resolution, unitsToPixels });

      const vertLabels = [
        new Text(i.toString(), { size: 18 }, { x: -0.6, y: i - 0.15 }),
        new Text((-i).toString(), { size: 18 }, { x: -0.6, y: -i - 0.15 }),
      ] as const;
      vertLabels[0].draw({ ctx, resolution, unitsToPixels });
      vertLabels[1].draw({ ctx, resolution, unitsToPixels });
    }

    const zeroLabel = new Text("0", { size: 18 }, { x: -0.6, y: -0.15 });
    zeroLabel.draw({ ctx, resolution, unitsToPixels });
  }
}
