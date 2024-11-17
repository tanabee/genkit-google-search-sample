import { genkit, z } from 'genkit';
import { vertexAI } from '@genkit-ai/vertexai';
import { gemini15Flash } from '@genkit-ai/vertexai';

const ai = genkit({
  model: gemini15Flash.withConfig({ googleSearchRetrieval: {}}),
  plugins: [vertexAI({ location: 'us-central1' })],
});

export const mainFlow = ai.defineFlow(
  {
    name: 'mainFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (prompt) => {
    const { text } = await ai.generate(prompt);
    return text;
  }
);

ai.startFlowServer({ flows: [mainFlow] });