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
  // Encapsulamos la llamada en un try-catch para manejar errores de red o de la API de forma segura.
  try {
    const result = await generateReflectionQuestionsFlow(input);
    // Aseguramos que siempre devolvemos un objeto con la estructura esperada.
    return result || { questions: [] };
  } catch (error) {
    console.error('Error in generateReflectionQuestions flow:', error);
    // En caso de error, devolvemos un array vacío para no romper el cliente.
    return { questions: [] };
  }
}

const prompt = ai.definePrompt({
  name: 'generateReflectionQuestionsPrompt',
  input: {schema: GenerateReflectionQuestionsInputSchema},
  output: {schema: GenerateReflectionQuestionsOutputSchema},
  prompt: `Eres un profesor experto en pedagogía y reflexión. Tu tarea es generar una lista de exactamente 3 preguntas de reflexión profundas y abiertas, SIEMPRE EN ESPAÑOL, basadas en el siguiente texto. Las preguntas deben invitar a la introspección personal y a conectar el texto con la vida del estudiante.

Texto:
{{{text}}}

Genera las 3 preguntas de reflexión:`,
  model: 'gemini-1.5-flash',
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_LOW_AND_ABOVE' },
    ],
    // Añadimos un tiempo de espera para evitar errores en entornos con respuesta lenta.
    requestConfig: {
      timeout: 30000, // 30 segundos
    }
  },
});

const generateReflectionQuestionsFlow = ai.defineFlow(
  {
    name: 'generateReflectionQuestionsFlow',
    inputSchema: GenerateReflectionQuestionsInputSchema,
    outputSchema: GenerateReflectionQuestionsOutputSchema,
  },
  async input => {
    // Verificamos si el texto de entrada es válido.
    if (!input || !input.text || input.text.trim() === '') {
      return { questions: [] };
    }
    const {output} = await prompt(input);
    // Verificamos si la salida del modelo es válida antes de devolverla.
    return output || { questions: [] };
  }
);
