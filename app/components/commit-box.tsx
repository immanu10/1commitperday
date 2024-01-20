"use client";

import { useEffect, useRef, useState } from "react";
import { CopyBtn, DownloadBtn, ShareBtn } from "./buttons";
import { toast } from "sonner";
import { drawCard } from "../lib/canvas";
import { canvasData } from "../lib/api";

export function CommitBox({ data }: { data: canvasData | null }) {
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) {
      console.log("Something went wrong");
      return;
    }
    if (data) {
      drawCard(canvasRef.current, data);
    }
    setLoading(false);
  }, [data]);

  const onCopy = () => {
    copyToClipboard(canvasRef.current!);
  };
  const onDownload = () => {
    downloadAsPNG(canvasRef.current!);
  };
  const onShare = () => {
    sharePng(canvasRef.current!);
  };

  if (data === null) {
    return (
      <p className="text-sm text-center">
        Something went wrong. No data Found.
      </p>
    );
  }

  return (
    <>
      {loading ? (
        <div className="flex flex-col space-y-2 items-center">
          <LoadingIcon />
          <p className="text-sm text-center">
            {"Loading... getting your today's commits"}
          </p>
        </div>
      ) : (
        <div className="mb-4 flex flex-col space-y-4">
          <p className="text-sm text-center">
            {data.totalContribution > 0
              ? "Congratzzz! You have completed today's #1commitperday challenge."
              : "No commits yet. Make atleast one commit today to get your today's #1commitperday png."}
          </p>
          {data.totalContribution > 0 && (
            <div className="flex justify-center gap-4">
              <CopyBtn onClick={onCopy} />
              <DownloadBtn onClick={onDownload} />
              {global.navigator && "share" in navigator && (
                <ShareBtn onClick={onShare} />
              )}
            </div>
          )}
        </div>
      )}
      {data !== null && <canvas ref={canvasRef} className="w-full" />}
    </>
  );
}

function LoadingIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6 animate-spin"
    >
      <line x1="12" x2="12" y1="2" y2="6" />
      <line x1="12" x2="12" y1="18" y2="22" />
      <line x1="4.93" x2="7.76" y1="4.93" y2="7.76" />
      <line x1="16.24" x2="19.07" y1="16.24" y2="19.07" />
      <line x1="2" x2="6" y1="12" y2="12" />
      <line x1="18" x2="22" y1="12" y2="12" />
      <line x1="4.93" x2="7.76" y1="19.07" y2="16.24" />
      <line x1="16.24" x2="19.07" y1="7.76" y2="4.93" />
    </svg>
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
      .then(() => toast.success("Copied to clipboard."))
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

function sharePng(canvas: HTMLCanvasElement) {
  try {
    canvas.toBlob(async (blob) => {
      if (blob) {
        navigator.share({
          title: "#1commitperday challenge",
          text: "Check out my today's Github commit.",
          files: [
            new File(
              [blob],
              `${new Date().toISOString().split("T")[0]}-1commitperday.png`,
              {
                type: blob.type,
              }
            ),
          ],
        });
      } else {
        console.error("Blob is null ");
      }
    }, "image/png");
  } catch (err) {
    console.error(err);
  }
}
