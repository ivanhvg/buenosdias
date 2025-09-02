// src/ai/flows/generate-reflection-questions.ts
'use server';
/**
 * @fileOverview Generates reflection questions based on a given text.
 *
 * - generateReflectionQuestions - A function that generates reflection questions.
 * - GenerateReflectionQuestionsInput - The input type for the generateReflectionQuestions function.
 * - GenerateReflectionQuestionsOutput - The return type for the generateReflectionQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateReflectionQuestionsInputSchema = z.object({
  text: z.string().describe('The text to generate reflection questions for.'),
});
export type GenerateReflectionQuestionsInput = z.infer<typeof GenerateReflectionQuestionsInputSchema>;

const GenerateReflectionQuestionsOutputSchema = z.object({
  questions: z.array(z.string()).describe('An array of reflection questions.'),
});
export type GenerateReflectionQuestionsOutput = z.infer<typeof GenerateReflectionQuestionsOutputSchema>;

export async function generateReflectionQuestions(
  input: GenerateReflectionQuestionsInput
): Promise<GenerateReflectionQuestionsOutput> {
  return generateReflectionQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReflectionQuestionsPrompt',
  input: {schema: GenerateReflectionQuestionsInputSchema},
  output: {schema: GenerateReflectionQuestionsOutputSchema},
  prompt: `Eres un profesor con experiencia. Genera una lista de 3 preguntas de reflexión, SIEMPRE EN ESPAÑOL, basadas en el siguiente texto:

Texto: {{{text}}}

Preguntas:`,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const generateReflectionQuestionsFlow = ai.defineFlow(
  {
    name: 'generateReflectionQuestionsFlow',
    inputSchema: GenerateReflectionQuestionsInputSchema,
    outputSchema: GenerateReflectionQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
