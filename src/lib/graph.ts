import { Entity } from "./entity";
import { Axis } from "./types";

export class Graph {
  private ctx: CanvasRenderingContext2D = null!;

  // Units on the graph axis.
  private scale: number = 10;

  // Padding on a graph for every element.
  private padding: number = 0;

  constructor(
    id: string,
    size: number,
    padding: number,
    scale = 10,
    private resolution = 2
  ) {
    const canvas = document.getElementById(id) as HTMLCanvasElement | null;

    if (!canvas) throw new Error(`Failed to get canvas by id "${id}"`);

    canvas.style.width = size + "px";
    canvas.style.height = size + "px";

    canvas.width = size * resolution;
    canvas.height = size * resolution;

    const ctx = canvas.getContext("2d")!;

    this.ctx = ctx;
    this.scale = scale;

    ctx.transform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2);

    ctx.fillStyle = "white";
    ctx.fillRect(
      this.unitsToPixels(-10),
      this.unitsToPixels(-10),
      canvas.height,
      canvas.width
    );
    ctx.fill();
    this.padding = this.unitsToPixels(padding);
  }

  public draw(entity: Entity) {
    entity.draw({
      ctx: this.ctx,
      resolution: this.resolution,
      scale: this.scale,
      unitsToPixels: (units, axis, absolute) =>
        this.unitsToPixels(units, axis, absolute),
    });
  }

  private unitsToPixels(
    units: number,
    axis = Axis.X,
    absolute = false
  ): number {
    axis === Axis.Y ? (units = -units) : null;

    if (absolute) return (this.ctx.canvas.width / this.scale / 2) * units;

    return (
      ((this.ctx.canvas.width - this.padding * this.resolution) /
        this.scale /
        2) *
      units
    );
  }
}
