export default function createCanvas(width: number, height: number): HTMLCanvasElement | null {
  if (typeof document === "undefined") {
    return null;
  }
  let canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;  
  return canvas;
}
