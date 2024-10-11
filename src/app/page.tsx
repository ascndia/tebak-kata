/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useGame } from "@/context/GameProvider";
import Form from "@/components/section/Form";
import { Button } from "@/components/ui/button";
import Profile from "@/components/section/Profile";
import { Result } from "@/types";
import { Label } from "@/components/ui/label";
import Hint from "@/components/section/Hint";
import GuessBar from "@/components/section/GuessBar";
import { useTheme } from "next-themes";
import ToggleThemeButton from "@/components/section/ToggleThemeButton";

function Home() {
  const { isFetching, result, guesses, started, startGame, question } =
    useGame();
  const { setTheme, theme } = useTheme();
  if (!started) {
    return (
      <div className="min-h-screen flex relative items-center justify-center">
        <Card className="w-full  max-w-md relative">
          <CardHeader className="flex flex-col items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">
              Game Tebak Kata
            </CardTitle>
            <Profile />
          </CardHeader>
          <CardContent className="flex  items-center justify-center space-x-2">
            <Button onClick={startGame}>Mulai Game</Button>{" "}
            <ToggleThemeButton />
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="min-h-screen pt-12 relative flex items-start justify-center">
      <Card className="w-full  max-w-md ">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Game Tebak Kata</CardTitle>{" "}
          <Profile />
          <ToggleThemeButton />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <Hint />
          </div>
          <Form />
          <div className="space-y-2 py-2">
            {result !== undefined ? (
              <div className="flex flex-col space-y-1">
                <Label>Hasil</Label>
                <GuessBar {...result} />
              </div>
            ) : null}

            <div className="flex flex-col space-y-1 py-2">
              {guesses.length !== 0 && <Label>History</Label>}
              <div className="flex flex-col space-y-2">
                {guesses.map((guess, index) => (
                  <GuessBar {...guess} key={index} />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Home;
