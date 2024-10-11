/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppType } from "@/server/hono";
import { hc } from "hono/client";
import { Guess, Question, Result } from "@/types";
import { questions } from "./question";

export const fetchAnswer = async (question: Question, answer: string) => {
  const APP_URL = process.env.NEXT_PUBLIC_HOST as string;
  const client = hc<AppType>(APP_URL);

  try {
    const response = await client.api.$post({ json: { question, answer } });
    return await response.json();
  } catch (error) {
    console.error("Error fetching answer:", error);
    throw error;
  }
};

export const handleResult = ({
  similarity,
  answer,
}: Record<string, any>): Result => {
  const color = mapColor(similarity);
  const rank = calculateSimilarity(similarity);
  const similarity_percentage = Math.pow(similarity, 2) * 100;
  return { rank, color, similarity, answer, similarity_percentage };
};

export const sortGuesses = (guesses: Array<Guess>) => {
  return guesses.sort((a, b) => {
    return b.similarity - a.similarity;
  });
};

export const calculateSimilarity = (similarity: number) => {
  let calculated = 0;
  const base = 1;
  const k = 20;
  calculated = base * Math.exp(k * (1 - similarity));
  return Math.round(calculated);
};

export const mapColor = (similarity: number) => {
  if (similarity > 0.8) {
    return "#2ECC71";
  } else if (similarity > 0.6) {
    return "#F39C12";
  } else {
    return "#E74C3C";
  }
};

export const getQuestion = async () => {
  return questions[Math.floor(Math.random() * questions.length)];
};
