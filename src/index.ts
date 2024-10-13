import * as z from 'zod';
import { generate } from '@genkit-ai/ai';
import { configureGenkit } from '@genkit-ai/core';
import { defineFlow, startFlowsServer } from '@genkit-ai/flow';
import { vertexAI } from '@genkit-ai/vertexai';
import { gemini15Flash } from '@genkit-ai/vertexai';

configureGenkit({
  plugins: [
    vertexAI({ location: 'us-central1' }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

export const mainFlow = defineFlow(
  {
    name: 'mainFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (prompt) => {
    const llmResponse = await generate({
      prompt,
      model: gemini15Flash,
      config: {
        temperature: 1,
        googleSearchRetrieval: {}
      },
    });
    return llmResponse.text();
  }
);

startFlowsServer();