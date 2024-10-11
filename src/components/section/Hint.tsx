"use client";
import { useHint } from "@/context/GameProvider";
import React from "react";
import { Button } from "../ui/button";

export default function Hint() {
  const { canShowHint, showHint, hint } = useHint();

  return (
    <div className="flex-1 flex space justify-between">
      <HintDisplay end={!canShowHint()} hint={hint} />
      <Button
        disabled={!canShowHint()}
        onClick={() => {
          showHint();
        }}
      >
        {canShowHint() ? "Hint🤪" : "Hint abis😼"}
      </Button>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HintDisplay = ({ hint, end }: { hint: any[]; end: boolean }) => {
  return (
    <div className="flex justify-between items-center">
      {hint.length !== 0 && <p className="text-xl font-bold mr-2">Hint: </p>}
      <div className="flex space-x-1">
        {hint.map((hint, index) => (
          <p key={index}>{hint}</p>
        ))}
      </div>
      {end && <p>...</p>}
    </div>
  );
};
