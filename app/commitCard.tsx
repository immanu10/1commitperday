"use client";

import { useEffect, useRef, useState } from "react";
import { drawCard } from "./lib/canvas";
import { canvasData } from "./lib/api";
import { CopyBtn, DownloadBtn } from "./buttons";

export function CommitCard({ data }: { data: canvasData }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) {
      console.log("Something went wrong");
      return;
    }
    drawCard(canvasRef.current, data);
  }, [data]);

  const onCopy = () => {
    copyToClipboard(canvasRef.current!);
  };
  const onDownload = () => {
    downloadAsPNG(canvasRef.current!);
  };

  return (
    <div>
      <div className="mb-4 flex flex-col space-y-4">
        <p className="text-sm">
          {data.totalContribution > 0
            ? "Congratzzz! You have completed today's #1commitperday challenge."
            : "No commits yet. Make atleast one commit today to get your today's #1commitperday png."}
        </p>
        {data.totalContribution > 0 && (
          <div className="flex justify-center gap-4">
            <CopyBtn onClick={onCopy} />
            <DownloadBtn onClick={onDownload} />
          </div>
        )}
      </div>
      <canvas ref={canvasRef} className="w-full" />
    </div>
  );
}

function copyToClipboard(canvas: HTMLCanvasElement) {
  if ("ClipboardItem" in window) {
    const item = new ClipboardItem({
      "image/png": new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, "image/png");
      }) as PromiseLike<string | Blob>,
    });
    navigator.clipboard
      .write([item])
      .then(() => console.log("🎉 Copied image!"))
      .catch((err) => {
        console.error("failed to copy");
      });
  } else {
    console.error("failed to copy");
  }
}

function downloadAsPNG(canvas: HTMLCanvasElement) {
  try {
    const dataURL = canvas.toDataURL();
    const a = document.createElement("a");
    document.body.insertAdjacentElement("beforeend", a);
    a.href = dataURL;
    a.download = `${new Date().toISOString().split("T")[0]}-1commitperday.png`;
    a.click();
    document.body.removeChild(a);
  } catch (error) {
    console.error("Cannot download png", error);
  }
}
