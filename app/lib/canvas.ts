import { Roboto_Mono } from "next/font/google";
import { canvasData } from "./api";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
});

function getDevicePixelRatio() {
  if (typeof window === "undefined") return 1;
  return window.devicePixelRatio || 1;
}

const themes = {
  default: {
    background: "#101217",
    color: "#ffffff",
    metaColor: "#dddddd",
    NONE: "#161b22",
    FIRST_QUARTILE: "#003820",
    SECOND_QUARTILE: "#00602d",
    THIRD_QUARTILE: "#10983d",
    FOURTH_QUARTILE: "#27d545",
  },
};

const scale = getDevicePixelRatio();
const canvasWidth = 600;
const canvasHeight = 280;
const canvasMargin = 50;
const titleHeight = 30;

const squareSize = 180;
const borderRadius = 16;
const APP_NAME = "1commitperday.com";

export function drawCard(canvas: HTMLCanvasElement, options: canvasData) {
  const theme = themes.default;
  canvas.width = canvasWidth * scale;
  canvas.height = canvasHeight * scale;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Error getting 2d context");
  }

  ctx.scale(scale, scale);

  ctx.fillStyle = theme.background;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  ctx.fillStyle = theme[options.contributionLevel];

  const commitBoxX = canvasMargin;
  const commitBoxY = titleHeight + 30;

  ctx.beginPath();
  ctx.moveTo(commitBoxX + borderRadius, commitBoxY);
  ctx.lineTo(commitBoxX + squareSize - borderRadius, commitBoxY);
  ctx.arcTo(
    commitBoxX + squareSize,
    commitBoxY,
    commitBoxX + squareSize,
    commitBoxY + borderRadius,
    borderRadius
  );
  ctx.lineTo(commitBoxX + squareSize, commitBoxY + squareSize - borderRadius);
  ctx.arcTo(
    commitBoxX + squareSize,
    commitBoxY + squareSize,
    commitBoxX + squareSize - borderRadius,
    commitBoxY + squareSize,
    borderRadius
  );
  ctx.lineTo(commitBoxX + borderRadius, commitBoxY + squareSize);
  ctx.arcTo(
    commitBoxX,
    commitBoxY + squareSize,
    commitBoxX,
    commitBoxY + squareSize - borderRadius,
    borderRadius
  );
  ctx.lineTo(commitBoxX, commitBoxY + borderRadius);
  ctx.arcTo(
    commitBoxX,
    commitBoxY,
    commitBoxX + borderRadius,
    commitBoxY,
    borderRadius
  );
  ctx.closePath();

  ctx.strokeStyle = "#ffffff0d";
  ctx.lineWidth = 10;
  ctx.stroke();
  ctx.fill();

  ctx.fillStyle = theme.color;
  ctx.font = `16px ${robotoMono.style.fontFamily}`;
  ctx.fillText(`@${options.username}`, canvasMargin, titleHeight + 10);

  ctx.fillStyle = theme.metaColor;

  ctx.font = `10px ${robotoMono.style.fontFamily}`;
  ctx.fillText(APP_NAME, canvasWidth - canvasMargin * 3, titleHeight + 10);

  ctx.fillStyle = theme.color;

  ctx.font = `72px ${robotoMono.style.fontFamily}`;
  ctx.fillText(
    options.totalContribution.toString(),
    commitBoxX + squareSize + 30,
    commitBoxY + 55
  );

  ctx.fillStyle = theme.color;

  ctx.font = `24px ${robotoMono.style.fontFamily}`;
  ctx.fillText("contributions", commitBoxX + squareSize + 30, commitBoxY + 100);

  ctx.fillStyle = theme.color;

  ctx.font = `24px ${robotoMono.style.fontFamily}`;
  ctx.fillText("today", commitBoxX + squareSize + 30, commitBoxY + 135);

  ctx.fillStyle = theme.metaColor;

  ctx.font = `12px ${robotoMono.style.fontFamily}`;
  ctx.fillText(options.date, commitBoxX + squareSize + 30, commitBoxY + 175);
}
