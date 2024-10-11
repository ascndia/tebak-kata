import { Question } from "@/types";
import axios from "axios";
import { toString } from "./question";
const API_KEY = process.env.HUGGINGFACE_API_KEY;
const MODEL_END_POINT = process.env.HUGGINGFACE_MODEL_END_POINT;

export const hfGetSimilarity = async (question: Question, answer: string) => {
  try {
    const response = await axios.post(
      MODEL_END_POINT!,
      {
        source_sentence: toString(question),
        sentences: [toString([question[0], answer])],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    return response.data[0];
  } catch (error) {
    console.error(error);
  }
};
