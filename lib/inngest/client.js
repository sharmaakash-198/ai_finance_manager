import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "akash", // Unique app ID
  name: "AI Finance Platform",
  retryFunction: async (attempt) => ({
    delay: Math.pow(2, attempt) * 1000, // Exponential backoff
    maxAttempts: 2,
  }),
});