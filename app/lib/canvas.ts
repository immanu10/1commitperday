import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
});

function getDevicePixelRatio() {
  if (typeof window === "undefined") return 1;
  return window.devicePixelRatio || 1;
}

const scale = getDevicePixelRatio();
const width = 600;
const height = 280;
const margin = 50;
const titleHeight = 30;

export function drawCard(canvas: HTMLCanvasElement) {
  render(canvas);
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

  const squareSize = 180;
  const cornerRadius = 16;

  ctx.fillStyle = "#27d545";
  //   ctx.fillRect(100, 25, squareSize, squareSize);

  const commitBoxX = margin;
  const commitBoxY = titleHeight + 30;
  ctx.beginPath();
  ctx.moveTo(commitBoxX + cornerRadius, commitBoxY);
  ctx.lineTo(commitBoxX + squareSize - cornerRadius, commitBoxY);
  ctx.arcTo(
    commitBoxX + squareSize,
    commitBoxY,
    commitBoxX + squareSize,
    commitBoxY + cornerRadius,
    cornerRadius
  );
  ctx.lineTo(commitBoxX + squareSize, commitBoxY + squareSize - cornerRadius);
  ctx.arcTo(
    commitBoxX + squareSize,
    commitBoxY + squareSize,
    commitBoxX + squareSize - cornerRadius,
    commitBoxY + squareSize,
    cornerRadius
  );
  ctx.lineTo(commitBoxX + cornerRadius, commitBoxY + squareSize);
  ctx.arcTo(
    commitBoxX,
    commitBoxY + squareSize,
    commitBoxX,
    commitBoxY + squareSize - cornerRadius,
    cornerRadius
  );
  ctx.lineTo(commitBoxX, commitBoxY + cornerRadius);
  ctx.arcTo(
    commitBoxX,
    commitBoxY,
    commitBoxX + cornerRadius,
    commitBoxY,
    cornerRadius
  );
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#ffffff";

  ctx.font = `16px ${robotoMono.style.fontFamily}`;
  ctx.fillText("@immanu10", margin, titleHeight + 10);

  ctx.fillStyle = "#dddddd";

  ctx.font = `10px ${robotoMono.style.fontFamily}`;
  ctx.fillText(
    "1commitperday.vercel.com",
    width - (margin + 10) * 3,
    titleHeight + 10
  );

  ctx.fillStyle = "#ffffff";

  ctx.font = `72px ${robotoMono.style.fontFamily}`;
  ctx.fillText("8", commitBoxX + squareSize + 30, commitBoxY + 55);

  ctx.fillStyle = "#ffffff";

  ctx.font = `24px ${robotoMono.style.fontFamily}`;
  ctx.fillText("contributions", commitBoxX + squareSize + 30, commitBoxY + 100);

  ctx.fillStyle = "#ffffff";

  ctx.font = `24px ${robotoMono.style.fontFamily}`;
  ctx.fillText("today", commitBoxX + squareSize + 30, commitBoxY + 135);

  ctx.fillStyle = "#dddddd";

  ctx.font = `12px ${robotoMono.style.fontFamily}`;
  ctx.fillText("4, Jan 2024", commitBoxX + squareSize + 30, commitBoxY + 175);
}
