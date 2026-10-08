import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const getGroq = () => {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is required to use AI features.");
  }

  return new Groq({ apiKey });
};

const groq = {
  chat: {
    completions: {
      create: (...args) => getGroq().chat.completions.create(...args),
    },
  },
};

export default groq;
