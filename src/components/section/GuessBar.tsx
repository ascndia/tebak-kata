import { Guess } from "@/types";
import React from "react";
import { Card } from "../ui/card";

export default function GuessBar(guess: Guess) {
  return (
    <Card
      className={`flex  justify-between p-2 rounded}`}
      style={{
        position: "relative",
      }}
    >
      <div
        className="w-full"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            backgroundColor: guess.color,
            width: `${guess.similarity_percentage}%`,
            height: "100%",
            borderRadius: "4px",
            position: "absolute",
            left: 0,
          }}
        />

        <span className="relative ">{guess.answer}</span>
        <span className="relative">{guess.rank}</span>
      </div>
    </Card>
  );
}
