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
  questions: z.array(z.string()).describe('An array of 3 reflection questions.'),
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
  prompt: `Eres un profesor experto en pedagogía y reflexión. Tu tarea es generar una lista de exactamente 3 preguntas de reflexión profundas y abiertas, SIEMPRE EN ESPAÑOL, basadas en el siguiente texto. Las preguntas deben invitar a la introspección personal y a conectar el texto con la vida del estudiante.

Texto:
{{{text}}}

Genera las 3 preguntas de reflexión:`,
  config: {
    model: 'gemini-1.5-flash',
  },
});

const generateReflectionQuestionsFlow = ai.defineFlow(
  {
    name: 'generateReflectionQuestionsFlow',
    inputSchema: GenerateReflectionQuestionsInputSchema,
    outputSchema: GenerateReflectionQuestionsOutputSchema,
  },
  async input => {
    if (!input?.text?.trim()) {
      return { questions: [] };
    }
    
    const {output} = await prompt(input);
    return output || { questions: [] };
  }
);
