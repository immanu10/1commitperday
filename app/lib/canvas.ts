import { error } from "console";
import { IBM_Plex_Mono } from "next/font/google";

function getDevicePixelRatio() {
  if (typeof window === "undefined") return 1;
  return window.devicePixelRatio || 1;
}

const scale = getDevicePixelRatio();
const width = 300;
const height = 150;
const fontFace = "IBM Plex Mono";

export function drawCard(canvas: HTMLCanvasElement) {
  //   const myFont = new FontFace(
  //     "IBM Plex Mono",
  //     "url(https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300&display=swap)"
  //   );
  //   myFont
  //     .load()
  //     .then((font) => {
  //       document.fonts.add(font);

  render(canvas);
  // })
  // .catch((error) => console.log({ error }));
}

function render(canvas: HTMLCanvasElement) {
  canvas.width = width * scale;
  canvas.height = height * scale;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Error getting 2d context");
  }

  ctx.scale(scale, scale);

  ctx.fillStyle = "#101217";
  ctx.fillRect(0, 0, width, height);

  const squareSize = 100;
  const cornerRadius = 10;

  ctx.fillStyle = "#27d545";
  //   ctx.fillRect(100, 25, squareSize, squareSize);
  ctx.beginPath();
  ctx.moveTo(100 + cornerRadius, 25);
  ctx.lineTo(100 + squareSize - cornerRadius, 25);
  ctx.arcTo(
    100 + squareSize,
    25,
    100 + squareSize,
    25 + cornerRadius,
    cornerRadius
  );
  ctx.lineTo(100 + squareSize, 25 + squareSize - cornerRadius);
  ctx.arcTo(
    100 + squareSize,
    25 + squareSize,
    100 + squareSize - cornerRadius,
    25 + squareSize,
    cornerRadius
  );
  ctx.lineTo(100 + cornerRadius, 25 + squareSize);
  ctx.arcTo(
    100,
    25 + squareSize,
    100,
    25 + squareSize - cornerRadius,
    cornerRadius
  );
  ctx.lineTo(100, 25 + cornerRadius);
  ctx.arcTo(100, 25, 100 + cornerRadius, 25, cornerRadius);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.font = "8px 'IBM Plex Mono'";

  ctx.fillText("@immanu10", 100, 22);
}
