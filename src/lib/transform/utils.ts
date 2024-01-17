export const deg2rad = (deg: number): number => deg * (Math.PI / 180);
export const round = (num: number, places: number): number =>
  Number(num.toFixed(places));
