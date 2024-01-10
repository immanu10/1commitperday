"use client";

import { useEffect, useRef } from "react";
import { drawCard } from "./lib/canvas";

type Data = {
  username: string;
  totalContribution: number;
  contributionLevel: number;
};

export function CommitCard() {
  const canvasRef = useRef(null);

  useEffect(() => {
    draw();
  }, []);

  const draw = () => {
    if (!canvasRef.current) {
      console.log("Something went wrong");
      return;
    }
    drawCard(canvasRef.current);
  };

  return (
    <div>
      <canvas ref={canvasRef} className="w-full" />
    </div>
  );
}
