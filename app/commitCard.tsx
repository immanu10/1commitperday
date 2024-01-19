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
    drawCard(canvasRef.current, {
      contributionLevel: "NONE",
      totalContribution: 3,
      username: "manoj",
      date: "20 Jan,2024",
    });
  };

  return (
    <div>
      <canvas ref={canvasRef} className="w-full" />
    </div>
  );
}
