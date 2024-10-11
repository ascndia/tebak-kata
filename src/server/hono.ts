import { Hono } from "hono";
import { hfGetSimilarity } from "@/lib/huggingface";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono().basePath("/api");

const requestSchema = z.object({
  question: z.array(z.string()),
  answer: z.string(),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const route = app.post("/", zValidator("json", requestSchema), async (c) => {
  const { question, answer } = c.req.valid("json");

  try {
    const similarity = await hfGetSimilarity(question, answer);
    return c.json({
      question,
      answer,
      similarity,
    });
  } catch (error) {
    console.error(error);
    return c.text("Error", 500);
  }
});

export type AppType = typeof route;

export default app;
