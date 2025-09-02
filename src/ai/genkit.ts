import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
require('dotenv').config();

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY,
    }),
  ],
});
