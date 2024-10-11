"use client";

import { useGame } from "@/context/GameProvider";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function Form() {
  const { isFetching, handleAnswer, isSolved, resetGame } = useGame();
  const [text, setText] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) {
      alert("Teks tidak boleh kosong");
      return;
    }
    handleAnswer(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Tuliskan jawabanmu disini"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {isSolved && (
        <div className="flex flex-col space-y-2">
          <Button className="w-full" disabled>
            Jawaban Benar 🎉
          </Button>
          <Button className="w-full" variant={"outline"} onClick={resetGame}>
            Mainkan Lagi
          </Button>
        </div>
      )}
      {isFetching && !isSolved && (
        <Button className="w-full" disabled>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Mengecek Jawaban... 👀
        </Button>
      )}
      {!isFetching && !isSolved && (
        <Button type="submit" className="w-full">
          Cek Jawaban
        </Button>
      )}
    </form>
  );
}
