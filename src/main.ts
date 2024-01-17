import { Axis } from "@/lib/entity/axis";
import { Grid } from "@/lib/entity/grid";
import { Graph } from "@/lib/graph";
import { Line } from "./lib/entity/line";

const graph = new Graph("canvas", 800, 0.5, 10);

const grid = new Grid();
graph.draw(grid);

const axis = new Axis();
graph.draw(axis);

const lines: {
  function: (x: number) => number;
  inverse?: (y: number) => number;
}[] = [
  { function: () => -6 },
  { function: (x) => -x / 5 + 6 },
  { function: (x) => -3 * x, inverse: (y) => -y / 3 },
  { function: (x) => 2 * x - 2, inverse: (y) => y / 2 + 1 },
  { function: (x) => 5 * x - 20, inverse: (y) => y / 5 + 4 },
];

for (const lineFunc of lines) {
  const { function: func, inverse } = lineFunc;

  const posX = inverse ? inverse(10) : 10;
  const negX = inverse ? inverse(-10) : -10;

  const start = func(negX);
  const end = func(posX);

  const line = new Line({ x: negX, y: start }, { x: posX, y: end }, 2, true);

  graph.draw(line);
}

document.getElementById("export")!.addEventListener("click", () => {
  window.open(
    (document.getElementById("canvas") as HTMLCanvasElement)
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream"),
    "_blank"
  );
});
