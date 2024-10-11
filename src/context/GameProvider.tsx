"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  fetchAnswer,
  getQuestion,
  handleResult,
  sortGuesses,
} from "@/lib/logic-fe";
import { Guess, Question, Result } from "@/types";
import React, { useEffect } from "react";
import { start } from "repl";

const GameContext = React.createContext({
  started: false,
  setStarted: (started: boolean) => {},
  isFetching: false,
  setIsFetching: (isFetching: boolean) => {},
  isSolved: false,
  setIsSolved: (isSolved: boolean) => {},
  question: [] as Question,
  setQuestion: (question: Question) => {},
  result: undefined as Result | undefined,
  setResult: (result: Result) => {},
  guesses: [] as Guess[],
  setGuesses: (guesses: Array<Guess>) => {},
  initGame: () => {},
  startGame: () => {},
  resetGame: () => {},
  addGuesses: (guess: Guess) => {},
  handleAnswer: (answer: string) => {},
});

const GameProvider = ({ children }: React.PropsWithChildren) => {
  const [started, setStarted] = React.useState(false);
  const [isSolved, setIsSolved] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(false);
  const [question, setQuestion] = React.useState<Question>([]);
  const [result, setResult] = React.useState<Result | undefined>(undefined);
  const [guesses, setGuesses] = React.useState<Array<Guess>>([]);

  const addGuesses = (guess: Guess) => {
    const sorted = sortGuesses([...guesses, guess]);
    setGuesses(sorted);
  };

  const startGame = () => {
    setStarted(true);
    initGame();
  };

  const handleAnswer = async (answer: string) => {
    setIsFetching(true);
    try {
      const answerResult = await fetchAnswer(question, answer);
      const guessResult: Result = handleResult(answerResult);
      setResult(guessResult);
      addGuesses(guessResult);
      setIsFetching(false);

      checkResult(answerResult.similarity);
    } catch (error) {
      alert("Serverside Error: " + (error as Error).message);
    }
  };

  const checkResult = (similarity: number) => {
    if (similarity >= 1) {
      setIsSolved(true);
    }
  };

  const initGame = async () => {
    const generatedQuestion = await getQuestion();
    setQuestion(generatedQuestion);
  };

  const resetGame = () => {
    setQuestion([]);
    setGuesses([]);
    setResult(undefined);
    setIsSolved(false);
    setIsFetching(false);
    initGame();
  };
  return (
    <GameContext.Provider
      value={{
        started,
        setStarted,
        isFetching,
        setIsFetching,
        isSolved,
        setIsSolved,
        question,
        setQuestion,
        result,
        setResult,
        guesses,
        setGuesses,
        initGame,
        startGame,
        resetGame,
        addGuesses,
        handleAnswer,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

function useGame() {
  return React.useContext(GameContext);
}
function useHint() {
  const { question } = useGame();
  const [answer, setAnswer] = React.useState<string>(question[1]);
  const [hint, setHint] = React.useState<Array<string>>([]);
  const [hintCount, setHintCount] = React.useState(0);

  const canShowHint = () => {
    if (question.length === 0) {
      return false;
    }
    if (hintCount === question[0].split(" ").length) {
      return false;
    }
    return true;
  };

  const showHint = () => {
    if (question.length === 0) {
      return;
    }

    const hintText = question[0]; // return ["I want to Eat"]
    const spliced = hintText.split(" ");
    if (hintCount < spliced.length) {
      setHint([...hint, spliced[hintCount]]);
      setHintCount(hintCount + 1);
    }
  };

  useEffect(() => {
    setHint([]);
    setHintCount(0);
    setAnswer(question[1]);
  }, [question]);

  return {
    canShowHint,
    showHint,
    hint,
    hintCount,
  };
}

export default GameProvider;
export { useGame, useHint, GameContext };
