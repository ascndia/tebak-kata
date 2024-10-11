export type Guess = {
  answer: string;
  color: string;
  similarity: number;
  rank: number;
  similarity_percentage: number;
};

export type Question = Array<string>;

export type Result = {
  answer: string;
  similarity: number;
  similarity_percentage: number;
  color: string;
  rank: number;
};
